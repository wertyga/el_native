import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { setMenuState } from 'actions';

import { userMenuStyle } from './UserMenu.style';

const { buttonStyle, menuStyles, menuItemStyle } = userMenuStyle;

class UserMenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidUpdate(prevProps) {
    if (this.props.menuState !== prevProps.menuState) {
      const { menuRight } = this.state;
      const { menuState } = this.props;
      Animated.timing(
          menuRight,
          {
            toValue: menuState ? 0 : -200,
            duration: 200,
          }
      ).start();
    }
  }

  menuNavigate = (screen) => {
      const { navigation: { navigate } } = this.props;
      this.props.setMenuState();
      navigate(screen);
  }

  render() {

    const menuSlideStyle = { ...menuStyles, right: this.state.menuRight };

    return (
        <Animated.View style={menuSlideStyle}>
          {this.menuItems.map(({ name, screen }) => {
            return (
                <Text
                    pointerEvents="none"
                    key={name}
                    style={menuItemStyle}
                    onPress={() => this.menuNavigate(screen)}
                >
                  {name}
                </Text>
            );
          })}
        </Animated.View>
    );
  }
}

const mapState = ({ menu }) => {
  return {
    menuState: menu
  }
}

UserMenuComponent.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export const UserMenu = withNavigation(connect(mapState, { setMenuState })(UserMenuComponent));