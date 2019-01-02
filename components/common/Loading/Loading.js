import React from 'react';

import { ActivityIndicator, View, Text } from 'react-native';
import { style } from './Loading.style';

export const Loading = ({ text = 'Loading...' }) => (
    <View style={style}>
        <ActivityIndicator color={style.color} size="large" />
        <Text>{text}</Text>
    </View>
);