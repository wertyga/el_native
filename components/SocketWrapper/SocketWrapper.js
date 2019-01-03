// Socket wrapper that fetch socket data
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import io from "socket.io-client";

import isEmpty from "lodash/isEmpty";

import { View, Text, AsyncStorage } from 'react-native';

import { Loading, Toggle } from 'common-components';
import { setPowerPercents, getUserData, updatePairsPrice, setSeenPower, clearUser } from 'actions';
import { clearSession } from 'common';

import { UserScreen, UserMenu } from 'components';

import { socketStyles } from './socketWrapperStyles.style';

class SocketWrapperComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errors: ''
    };
  };

  componentDidMount() {
    this.checkUser()
    .then(id => {
      if (!id) return;
      if (isEmpty(this.props.user)) {
        const { navigation, navigation: { navigate } } = this.props;
        this.props.getUserData(id)
            .then(() => {
              this.setState({ loading: false });
              this.setupSocket();
            })
            .catch(err => {
              const errors = clearSession(this, err);
              if(errors) this.setState({ errors: errors, loading: false });
              navigation.setParam('userID', '');
              navigate('LoginScreen');
            })
      } else {
        this.setState({ loading: false });
        this.setupSocket();
      };
    });
  };

  componentWillUnmount() {
    if(this.socket) this.socket.close();
  };

  setupNavParams = () => {
    const { setParams } = this.props.navigation;
    const { username } = this.props.user;
    setParams({ onLogout: this.logout, username });
  };

  checkUser = () => {
    return Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('id'),
    ])
    .then(([token, id]) => {
      if (!token || !id) {
        this.props.navigation.navigate('LoginScreen');
        return false;
      }
      return id;
    })
  }

  logout = () => { // Logout user
    setTimeout(() => {
      this.props.clearUser(this.props.user._id);
      this.props.navigation.navigate('LoginScreen');
    }, 250)
  };

  setupSocket = () => { // Setup socket communicate
    this.setupNavParams();

    this.socket = io(host(`/`));

    this.socket.emit('room', { id: this.props.user._id});

    this.socket.on('update-price', pairs => {
      if(pairs.pairs.length < 1) return;
      this.props.updatePairsPrice(pairs.pairs)
    });

    this.socket.on('launch_reached_percents', data => {
      const powers = data.data;
      powers.filter(item => !!item);
      if(powers.length < 1) return;
      this.props.setPowerPercents(powers);
    });
  };


  render() {

    const { containerStyle, componentName, menuState } = this.props;
    const mainStyles = { ...socketStyles.main, ...containerStyle };

    return (
        <View style={mainStyles}>
          {this.state.loading && <Loading />}
          <UserMenu menuState={menuState} />
          {componentName === 'UserScreen' && <UserScreen />}
          {/*{componentName === 'Whales' && <Whales />}*/}
          {/*{componentName === 'PowerPercents' && <PowerPercents />}*/}


          {/* <Route path="/user/:id" exact render={() => <UserScreen {...this.props} {...this.state}/>}/>
          <Route path="/user/:id/whales-orders" component={Whales}/>
          <Route path="/user/:id/power-orders" component={PowerPercents}/> */}
        </View>
    );
  }
};

SocketWrapperComponent.propTypes = {
  setPowerPercents: PropTypes.func.isRequired, // Dispatch power percents
  getUserData: PropTypes.func.isRequired, //Fetch user data when reload/refresh page
  updatePairsPrice: PropTypes.func.isRequired, //Update price of all pairs
  setSeenPower: PropTypes.func.isRequired, // Function for set power one to { isSeen: true }
  powerPercents: PropTypes.array, // Array of power symbols
};

const mapState = (state) => {
  const { user, powerPercents } = state;
  return {
    user,
    powerPercents,
  };
};


export const SocketWrapper = connect(
  mapState,
  { setPowerPercents, getUserData, updatePairsPrice, setSeenPower, clearUser }
  )
  (SocketWrapperComponent);