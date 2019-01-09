// Socket wrapper that fetch socket data
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import io from "socket.io-client";
import isEmpty from "lodash/isEmpty";

import { View, Text, AsyncStorage } from 'react-native';

import { Loading, Toggle } from 'common-components';
import { setPowerPercents, getUserData, updatePairsPrice, clearUser } from 'actions';
import { clearSession } from 'common';

import { UserMenu } from 'components';

import { socketStyles } from './socketWrapperStyles.style';

import { registerForPushNotificationsAsync } from '../Notification/Notification';
import { Notifications } from 'expo';

class SocketWrapperComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errors: ''
    };
  }

  componentWillMount() {
    this.listener = Notifications.addListener(this.listen);
  }

 componentDidMount() {
   this.props.navigation.setParams({ onLogout: this.logout });
   this.checkUser()
   .then(id => {
     if (!id) {
       this.clearUserRedirect();
       return;
     };
     if (isEmpty(this.props.user)) {
       this.props.getUserData(id)
           .then(() => {
             this.setState({ loading: false });
             this.setupSocket();
           })
           .catch(err => {
             const errors = clearSession(this, err);
             if (errors.redirect) {
               this.clearUserRedirect();
               return;
             }
             this.setState({ errors: errors.message, loading: false });

           })
     } else {
       this.setState({ loading: false });
       this.setupSocket();
     };
   });
 }

  componentWillUnmount() {
    if(this.socket) this.socket.close();
    this.listener && typeof Notifications.removeListener === 'function' && Notifications.removeListener(this.listen);
  }

  listen(data) {}

  setupNavParams = () => {
    const { username } = this.props.user;
    this.props.navigation.setParams({ username });
  };

  clearUserRedirect = () => {
    const { navigation, navigation: { navigate } } = this.props;
    navigation.setParams({ userID: '' });
    navigate('LoginScreen');
  }

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
      registerForPushNotificationsAsync(id);
      return id;
    })
  }

  logout = () => { // Logout user
    setTimeout(() => {
      this.props.clearUser(this.props.user._id);
      this.clearUserRedirect();
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

    const { containerStyle, componentName, menuState, children } = this.props;
    const { loading, errors } = this.state;
    const mainStyles = { ...socketStyles.main, ...containerStyle };

    return (
        <View style={mainStyles} collapsable={false}>
          {loading && <Loading />}
          {!!errors && <Text style={socketStyles.errorStyle}>{errors}</Text>}
          <UserMenu />
          {children}
        </View>
    );
  }
};

SocketWrapperComponent.propTypes = {
  setPowerPercents: PropTypes.func.isRequired, // Dispatch power percents
  getUserData: PropTypes.func.isRequired, //Fetch user data when reload/refresh page
  updatePairsPrice: PropTypes.func.isRequired, //Update price of all pairs
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
  {
    setPowerPercents,
    getUserData,
    updatePairsPrice,
    clearUser,
  }
  )
  (SocketWrapperComponent);