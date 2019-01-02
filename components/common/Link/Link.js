import React from 'react';
import { withNavigation } from 'react-navigation';
import { Text } from 'react-native';

const LinkComponent = ({ to, children, navigation: { navigate }, ...props }) => {
  return <Text onPress={() => navigate(to)} {...props}>{children}</Text>
};

export const Link = withNavigation(LinkComponent);