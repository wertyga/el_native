import React from 'react';
import { View } from 'react-native';

import { UserMenu } from 'components';

export const WithUserMenu = WrappedComponent => (props) => {
  return (
    <View style={{ flex: 1 }}>
      <UserMenu />
      <WrappedComponent {...props} />
    </View>
  );
}