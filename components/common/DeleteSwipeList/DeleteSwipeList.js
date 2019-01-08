import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Button } from 'react-native-elements';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';

import { deleteListStyle } from './DeleteSwipeListStyle';
const { buttonDeleteStyle, renderItemStyle, buttonDeleteWrapperStyle, itemSeparatorStyle } = deleteListStyle;

export class DeleteSwipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: [],
    };

    this.rowTranslateAnimatedValues = {};
    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 50,
    };
  }

  renderRightActions = (item, progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [-300, 0],
      outputRange: [13, 320],
    });
    const key = item[this.props.keyItem];
    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          ...buttonDeleteWrapperStyle,
        }}
      >
        <Button
          rightIcon={{ name: 'delete-forever', size: 25 }}
          buttonStyle={buttonDeleteStyle}
          textStyle={{ fontWeight: 'bold' }}
          title="Delete"
          onPress={this.deleteHandler.bind(this, key)}
        />
      </Animated.View>
    );
  };

  renderLeftActions = (item, progress, dragX) => {
    const { leftSide } = this.props;
    const translateX = dragX.interpolate({
      inputRange: [0, 300],
      outputRange: [-200, -7],
    });
    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          flex: 1,
        }}
      >
        <leftSide.component
          {...leftSide.props}
          {...item}
        />
      </Animated.View>
    );
  };

  renderItems = ({ item }) => {
    const { center, keyItem, itemHeight, leftSide } = this.props;
    const key = item[keyItem];

    this.rowTranslateAnimatedValues[key] = { value: new Animated.Value(1), activated: false };
    const componentProps = {
      renderRightActions: this.renderRightActions.bind(this, item),
    };
    if (leftSide) {
      componentProps.renderLeftActions = this.renderLeftActions.bind(this, item);
    }

    return (

        <Swipeable
          {...componentProps}
        >
          <Animated.View
            style={{
              height: this.rowTranslateAnimatedValues[key].value.interpolate({
                inputRange: [0, 1],
                outputRange: [0, itemHeight],
              }),
              ...renderItemStyle,
              display: this.state.activated.indexOf(key) !== -1 ? 'none' : 'flex',
            }}
          >
            <center.component
              {...center.props}
              {...item}
            />
          </Animated.View>
        </Swipeable>

    );
  }

  deleteHandler = (key) => {
    Animated.timing(this.rowTranslateAnimatedValues[key].value, { toValue: 0, duration: 200 })
      .start(() => {
        this.setState({ activated: [...this.state.activated, key] });
        this.props.onDelete(key);
      })
  }

  render() {
    const { style, data, keyItem, renderItem, ...props } = this.props;
    return (
      <FlatList
        style={style}
        data={data}
        renderItem={this.renderItems}
        keyExtractor={item => item[keyItem]}
        renderHiddenItem={renderItem}
        viewabilityConfig={this.viewabilityConfig}
        {...props}
      />
    );
  }
}

DeleteSwipeList.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array.isRequired,
  // renderItem: PropTypes.func.isRequired,
  keyItem: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  loadingText: PropTypes.string,
  loadingTextStyle: PropTypes.object,
  itemHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}