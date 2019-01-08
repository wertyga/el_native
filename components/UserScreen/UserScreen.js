import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Keyboard, Dimensions, Animated } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';

import { withNavigation } from 'react-navigation';
import { Button, List, ListItem } from 'react-native-elements';

import { clearSession } from 'common';


import { clearUser, deletePair, getWhaleOrders, deletePercentPair, setPowerPercents } from 'actions';

import { Loading, Options, DeleteSwipeList } from 'common-components';
import { Pair, PairDown } from 'components';

import { userScreenStyles } from './UserScreen.style';

// const AnimatedPairDown = Animated.createAnimatedComponent(PairDown);

class UserScreenComponent extends Component {
  constructor(props) {
    super(props);


    this.state = {
      addingPair: false,
      optionItems: this.collectPairs(),
      optionValue: '',
      loading: false,
      modalVisible: true,
      errors: {},
    }
  };

  componentDidUpdate(prevProps) {
    if(this.props.pairs !== prevProps.pairs) { // Update trade pairs
      this.setState({
        optionItems: this.collectPairs()
      });
    }
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

  deletePair = id => { // Delete pair
    return this.props.deletePair(id)
      .then(() => this.state.errors && this.setState({ errors: '' }))
        .catch(err => {
          const errors = clearSession(this, err);
          if(errors) this.setState({ errors: errors })
        })
  };

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
      errors: {},
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

  // renderPairsList = ({ item }) => {
  //   return {
  //     component: Pair,
  //     props: {
  //       onClose: this.deletePair,
  //       ...item
  //     },
  //   };
  // }
  // renderRightActions = ({ _id }, progress, dragX) => {
  //   const translateX = dragX.interpolate({
  //     inputRange: [-300, 0],
  //     outputRange: [13, 320],
  //   });
  //   return (
  //     <Animated.View
  //       style={{
  //         transform: [{ translateX }],
  //         flex: 1,
  //         width: '100%',
  //         paddingLeft: 0,
  //       }}
  //     >
  //       <Button
  //         buttonStyle={userScreenStyles.buttonDanger}
  //         title="Delete"
  //         onPress={this.deletePair.bind(this, _id)}
  //       />
  //     </Animated.View>
  //   );
  // };
  // renderLeftActions = (item, progress, dragX) => {
  //   const translateX = dragX.interpolate({
  //     inputRange: [0, 300],
  //     outputRange: [-200, -7],
  //   });
  //   return (
  //   <Animated.View
  //     style={{
  //       transform: [{ translateX }],
  //       flex: 1,
  //       width: '100%',
  //       paddingLeft: 0,
  //     }}
  //   >
  //       <PairDown
  //         {...item}
  //       />
  //   </Animated.View>
  //   );
  // };
  // renderPairsList = ({ item }) => {
  //   const { width } = Dimensions.get('window');
  //   return (
  //     <Swipeable
  //       renderLeftActions={this.renderLeftActions.bind(this, item)}
  //       renderRightActions={this.renderRightActions.bind(this, item)}
  //       // leftThreshold={width}
  //     >
  //       <Pair
  //         onClose={this.deletePair}
  //         {...item}
  //       />
  //     </Swipeable>
  //   );
  // }

  // onRowOpen = (id) => {
  //   this.deletePair(id)
  // }

  render() {
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
          <Button
              onPress={this.addPair}
              buttonStyle={userScreenStyles.button}
              textStyle={userScreenStyles.buttonText}
              title="Add pair"
          />

          {/*<FlatList*/}
            {/*style={userScreenStyles.pairsListStyle}*/}
            {/*data={tradePairs}*/}
            {/*renderItem={this.renderPairsList}*/}
            {/*keyExtractor={item => item._id}*/}
          {/*/>*/}

          <DeleteSwipeList
            style={userScreenStyles.pairsListStyle}
            data={tradePairs}
            leftSide={{ component: PairDown }}
            center={{ component: Pair }}
            onDelete={this.deletePair}
            keyItem="_id"
            itemHeight={'100%'}
          />

        </View>
    );
  }
}

UserScreenComponent.propTypes = {
  // updatePairsPrice: PropTypes.func.isRequired, //Update price of all pairs
  deletePair: PropTypes.func.isRequired, //Delete pair by id
  deletePercentPair: PropTypes.func.isRequired, //Delete percent pair by user id
  user: PropTypes.object.isRequired, //User data object
  pairs: PropTypes.array.isRequired, //All available trade pairs
  tradePairs: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  // newPowerPercent: PropTypes.bool.isRequired, // Determinate is new power order is appeared
};

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
  setPowerPercents,
})(UserScreenComponent));