import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { whalesStyle } from './Whales.style';

const { buttonStyle, textBoldStyle } = whalesStyle;

export const WhaleButton = ({ text, onPress, active }) => {
    const style = buttonStyle(active);
    return (
      <Button
        raised
        buttonStyle={style}
        textStyle={textBoldStyle}
        onPress={onPress}
        title={text}
      />
    );
};

WhaleButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    active: PropTypes.bool,
}