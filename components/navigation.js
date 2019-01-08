import React from 'react';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { globalStyle } from 'common';
import { Toggle } from 'common-components';
import {
  LoginScreen,
  Remind,
  VerifyUser,
  SocketWrapper,
  AddingPair,
  UserSettings,
  MenuIcon,
  UserScreen,
  Whales,
  PowerPercents,
} from 'components';

const Navigation = createStackNavigator(
    {
      LoginScreen: {
        screen: props => <LoginScreen {...props} screen="login" containerStyle={globalStyle.container} />,
        navigationOptions: () => ({
          title: 'Login',
        }),
      },
      SignupScreen: {
        screen: props => <LoginScreen {...props} screen="signup" containerStyle={globalStyle.container}/>,
        navigationOptions: () => ({
          title: 'Signup',
        }),
      },
      RemindScreen: {
        screen: props => <Remind {...props} containerStyle={globalStyle.container}/>,
        navigationOptions: () => ({
          title: 'Remind password',
        }),
      },
      VerifyUserScreen: {
        screen: props => <VerifyUser {...props} containerStyle={globalStyle.container}/>,
        navigationOptions: () => ({
          title: 'Verify code',
        }),
      },
      MainScreen: {
        screen: (props) => {
          return (
              <SocketWrapper
                  {...props}
                  containerStyle={globalStyle.container}
                  componentName="UserScreen"
              >
                <UserScreen />
              </SocketWrapper>
          );
        },
        navigationOptions: ({ navigation: { getParam } }) => ({
          headerTitle: <Toggle label="Logged" open onChange={getParam('onLogout')} username={getParam('username')}/>,
          headerLeft: null,
          headerRight: <MenuIcon />,
        }),
      },

      WhalesScreen: {
        screen: (props) => {
          return (
              <Whales {...props} containerStyle={globalStyle.container}/>
          );
        },
        navigationOptions: () => ({
          title: 'Whale\'s orders',
          headerRight: <MenuIcon />,
        }),
      },

      UserAddPair: {
        screen: props => (
              <AddingPair {...props} containerStyle={globalStyle.container} />
        ),
        navigationOptions: () => ({
          headerStyle: {
            display: 'none',
          },
        }),
      },

      Settings: {
        screen: props => <UserSettings {...props} containerStyle={globalStyle.container}/>,
        navigationOptions: () => ({
          title: 'User settings',
          headerRight: <MenuIcon />,
        }),
      },

      PowerScreen: {
        screen: props => <PowerPercents {...props} />,
        navigationOptions: () => ({
          title: 'Bounce symbols',
          headerRight: <MenuIcon />,
        }),
      },

    },

    {
        initialRouteName: "LoginScreen",
        defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {},
        },
    },
);

export const AppNavigator = createAppContainer(Navigation);