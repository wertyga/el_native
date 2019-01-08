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

  renderMenuItems = () => {
    const menuItems = [
      {
        name: 'Settings',
        screen: 'Settings',
      },
      {
        name: 'Whale orders',
        screen: 'WhalesScreen',
      },
      {},
      {
        name: 'About',
        screen: 'AboutScreen',
      },
    ];
    if (this.props.user.isCool) {
      menuItems[2] = {
        name: 'Power symbols',
        screen: 'PowerScreen',
      };
    } else {
      menuItems.splice(2, 1);
    }

    return menuItems;
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
          {this.renderMenuItems().map(({ name, screen }) => {
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

const mapState = ({ menu, user }) => {
  return {
    menuState: menu,
    user,
  }
}

UserMenuComponent.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export const UserMenu = withNavigation(connect(mapState, { setMenuState })(UserMenuComponent));