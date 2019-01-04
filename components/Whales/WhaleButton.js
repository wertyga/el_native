import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

export const WhaleButton = ({ text, onPress, active }) => {
    return (
        <Button className={classnames({
            active: active,
        })}
                onPress={onPress}
                title={text}
                // onPress={() => self.setState({ [chosen]: sign })}
         />

    );
};

WhaleButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    active: PropTypes.bool,
}