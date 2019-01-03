import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setMenuState } from 'actions';

import Icon from 'react-native-vector-icons/FontAwesome';

const  buttonStyle = {
  backgroundColor: 'transparent',
  marginRight: 10,
}

const MenuIconComponent = ({ setMenuState }) => (
    <Icon.Button
        name="ellipsis-v"
        size={30}
        onPress={setMenuState}
        {...buttonStyle}
    />
);

export const MenuIcon = connect(null, { setMenuState })(MenuIconComponent);