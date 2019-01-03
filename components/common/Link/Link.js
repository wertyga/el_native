import React from 'react';
import { withNavigation } from 'react-navigation';
import { Text } from 'react-native';

const LinkComponent = ({ to, children, navigation: { navigate }, text, ...props }) => {
  return <Text onPress={() => navigate(to)} {...props}>{text}</Text>
};

export const Link = withNavigation(LinkComponent);