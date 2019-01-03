import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import { userMenuStyle } from './UserMenu.style';

const { buttonStyle, menuStyles, menuItemStyle } = userMenuStyle;

class UserMenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuShow: false,
      menuRight: new Animated.Value(-200),
    };
    this.menuItems = [
        {
            name: 'Settings',
            screen: 'Settings',
        },
        {
            name: 'Whale orders',
            screen: 'Whales',
        },
        {
            name: 'Power symbols',
            screen: 'Power',
        },
        {
            name: 'About',
            screen: 'About',
        },
    ];
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.menuShow !== prevState.menuShow) {
      const { menuShow, menuRight } = this.state;
      Animated.timing(
          menuRight,
          {
            toValue: menuShow ? 0 : -200,
            duration: 200,
          }
      ).start();
    }
  }

  onPress = () => {
    this.setState({
      menuShow: !this.state.menuShow,
    });
  }

  menuNavigate = (screen) => {
      const { navigation: { navigate } } = this.props;
      navigate(screen);
  }

  render() {

    const menuSlideStyle = { ...menuStyles, right: this.state.menuRight };

    return (
        <View>
          <Icon.Button
              name="ellipsis-v"
              size={30}
              onPress={this.onPress}
              {...buttonStyle}
          />
          <Animated.View style={menuSlideStyle}>
            {this.menuItems.map(({ name, screen }) => {
              return (
                  <Text key={name} style={menuItemStyle} onPress={() => this.menuNavigate(screen)}>{name}</Text>
              );
            })}
          </Animated.View>
        </View>
    );
  }
}

UserMenuComponent.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export const UserMenu = withNavigation(UserMenuComponent);