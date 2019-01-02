import React from 'react';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { globalStyle } from 'common';
import { Toggle } from 'common-components';
import {
  LoginScreen,
  Remind,
  VerifyUser,
  SocketWrapper,
  UserScreen,
  AddingPair,
  UserMenu,
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
        screen: props => {
          return (
              <SocketWrapper
                  {...props}
                  containerStyle={globalStyle.container}
                  componentName="UserScreen"
              />
          );
        },
        navigationOptions: ({ navigation: { getParam } }) => ({
          headerTitle: <Toggle label="Logged" open onChange={getParam('onLogout')} username={getParam('username')}/>,
          headerLeft: null,
          headerRight: <UserMenu />,
        }),
      },

      UserAddPair: {
        screen: props => <AddingPair {...props} containerStyle={globalStyle.container} />,
        navigationOptions: () => ({
          headerStyle: {
            display: 'none',
          },
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