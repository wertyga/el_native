import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import { clearSession } from 'common';

import { clearUser, deletePair, getWhaleOrders, deletePercentPair, setPowerPercents } from 'actions';

import { Loading, Options } from 'common-components';
import { Pair } from 'components';
// import Option from '../common/Option/Option';
// import Toggle from '../common/Toggle/Toggle';
// import ButterMenu from '../common/ButterMenu/ButterMenu';
// import AddingPair from '../AddingPair/AddingPair';
// import Pair from '../Pair/Pair';
// import Settings from '../Settings/Setting';
// import Settings from '../Settings/Setting';

import { userScreenStyles } from './UserScreen.style';

class UserScreenComponent extends Component {
  constructor(props) {
    super(props);


    this.state = {
      addingPair: false,
      optionItems: this.collectPairs(),
      // tradePairs: this.props.tradePairs || [],
      optionValue: '',
      // settings: false,
      loading: false,
      modalVisible: true,
      errors: {},
    }
  };

  componentDidUpdate(prevProps) {
  //   if(this.props.loading !== prevProps.loading) { // Set loading from wrapper socket component
  //     this.setState({ loading: this.props.loading });
  //   };
  //   if(this.props.errors !== prevProps.errors) { // Update errors fom wrapper socket component
  //     this.setState({ errors: this.props.errors });
  //   };
  //
    if(this.props.pairs !== prevProps.pairs) { // Update trade pairs
      this.setState({
        optionItems: this.collectPairs()
      });
    };

  //   if(this.props.tradePairs !== prevProps.tradePairs) {
  //     this.setState({ tradePairs: this.props.tradePairs });
  //   };
  //
  };

  getPairToAdd = () => { // Get and check pair for adding sign
    return this.state.optionItems.find(item => item.name === this.state.optionValue)
  };

  addPair = () => { // Show dialog window to set sign price
    if(this.state.optionValue && this.getPairToAdd()) {
      const { optionItems, optionValue } = this.state;
      const { user: { _id } } = this.props;

      const needPair = optionItems.find(item => item.name === optionValue);
      this.setState({ errors: '' });
      this.props.navigation.navigate('UserAddPair', { pair: needPair, userID:  _id});
    } else {
      this.setState({
        errors: {
          option: 'Incorrect pair input'
        }
      })
    }
  };
  //
  //
  deletePair = id => { // Delete pair
    return this.props.deletePair(id)
        .catch(err => {
          const errors = clearSession(this, err);
          if(errors) this.setState({ errors: errors, loading: false })
        })
  };
  //
  // onClose = () => { // Close modal window when setting sign price
  //   this.setState({
  //     optionValue: '',
  //     addingPair: false,
  //     optionItems: this.collectPairs()
  //   })
  // };
  //
  //
  // goToWhales = () => { // Fetch whales orders book
  //   this.setState({ loading: true });
  //   this.props.getWhaleOrders()
  //       .then(() => {
  //         this.props.history.replace(`/user/${this.props.user._id}/whales-orders`);
  //       })
  //       .catch(err => {
  //         const errors = clearSession(this, err);
  //         if(errors) this.setState({ errors: errors, loading: false })
  //       })
  // };
  //

  collectPairs = (pairs = this.props.pairs, filter) => {
    const result = pairs
        .map(item => ({ title: item.symbol, name: `${item.baseAsset}/${item.quoteAsset}` }));

    if (filter) {
      return result.filter(item => item.title.toUpperCase().match(filter.toUpperCase()));
    }
    return result.sort((a, b) => a.name > b.name ? 1 : -1);
  };

  changeOptionValue = title => { //Option changing between pairs
    const pair = this.state.optionItems.find(item => item.title === title) || {};

    this.setState({
      optionValue: pair.name || '',
    }, () => Keyboard.dismiss());
  };

  onOptionFilter = (value) => {
    this.setState({
      optionValue: value,
      optionItems: this.collectPairs(undefined, value),
      errors: {
          ...this.state.error,
        option: '',
      },
    });
  }

  renderPairsList = ({ item }) => {
    return (
        <Pair
            onClose={this.deletePair}
            { ...item }
        />
    );
  }

  render() {

    // const menu = [
    //   {
    //     text: 'Get whales orders',
    //     onClick: () => this.goToWhales(),
    //
    //   },
    //   {
    //     text: 'Get power symbols',
    //     onClick: () => this.props.history.replace(`/user/${this.props.user._id}/power-orders`),
    //     className: {
    //       sign: this.props.newPowerPercent
    //     }
    //   }
    // ];

    const { errors, optionValue, optionItems, loading } = this.state;
    const { tradePairs } = this.props;
    return (
        <View>
          {!!errors &&
          (typeof errors !== 'object') &&
          <Text style={userScreenStyles.error}>{errors}</Text>
          }

          <Options
              value={optionValue}
              items={optionItems}
              onSelect={this.changeOptionValue}
              emptyValue='--No pairs--'
              disable={loading}
              onInputChange={this.onOptionFilter}
              disableValue="Loading..."
              floatText='Choose symbol'
              error={errors.option}
          />
          <TouchableOpacity
              className="primary"
              onPress={this.addPair}
              disabled={!optionValue}
              style={userScreenStyles.button}
          >
            <Text style={userScreenStyles.buttonText}>Add pair</Text>
          </TouchableOpacity>

          <FlatList
              style={userScreenStyles.pairsListStyle}
              data={tradePairs}
              renderItem={this.renderPairsList}
              keyExtractor={item => item._id}
          />

        </View>
    );
  }
};

// UserScreenComponent.propTypes = {
//   updatePairsPrice: PropTypes.func.isRequired, //Update price of all pairs
//   deletePair: PropTypes.func.isRequired, //Delete pair by id
//   deletePercentPair: PropTypes.func.isRequired, //Delete percent pair by user id
//   user: PropTypes.object.isRequired, //User data object
//   pairs: PropTypes.array.isRequired, //All available trade pairs
//   newPowerPercent: PropTypes.bool.isRequired, // Determinate is new power order is appeared
// };

const mapState = state => {
  return {
    user: state.user,
    tradePairs: state.tradePairs,
    pairs: state.pairs,
    // newPowerPercent: !!state.powerPercents.find(item => !item.isSeen)
  };
};

export const UserScreen = withNavigation(connect(mapState, {
  deletePair,
  clearUser,
  getWhaleOrders,
  deletePercentPair,
  setPowerPercents
})(UserScreenComponent));