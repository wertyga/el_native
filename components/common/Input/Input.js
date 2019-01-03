import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { TextInput, View, Text, Animated } from 'react-native';
import { globalStyle } from 'common';

import { style } from "./Input.styles";

export class Input extends Component{
    constructor() {
        super();

        this.state = {
            value: '',
            focus: false,
            focusFontSize: new Animated.Value(0),
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.focus !== prevState.focus) {
            const { focus } = this.state;
            Animated.timing(
                this.state.focusFontSize,
                {
                    toValue: focus ? 10 : 0,
                    duration: 300,
                }
            ).start();
        };
    }

    onFocus = () => {
        this.setState({
            focus: true
        });
        this.props.onFocus();
    }

    onBlur = () => {
        this.setState({
            focus: false
        });
      this.props.onBlur();
    }

    onChange = (value) => {
        const { name, onChange } = this.props;
        onChange(name, value);
    }

    render() {
        const { name, floatText, error,
            value, placeholder, secureTextEntry, disabled, autoFocus } = this.props;
        const { focus } = this.state;

        const animateTextStyle = {
            ...style.floatText,
            fontSize: this.state.focusFontSize,
        };
        const inputStyle = {
            ...style.input,
        };
        if (error) {
            inputStyle.color = globalStyle.errorColor;
            inputStyle.borderBottomColor = globalStyle.errorColor;
        }
        return (
            <View style={style.main}>
                <View style={style.inputWrapper}>
                    <Animated.Text style={animateTextStyle}>{floatText}</Animated.Text>
                    <TextInput
                        onChangeText={this.onChange}
                        value={value}
                        name={name}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        placeholder={!focus ? placeholder : ''}
                        style={inputStyle}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={style.placeholderTextColor}
                        editable={!disabled}
                        autoFocus={autoFocus}
                    />
                </View>
                {!!error && <Text style={style.errorInput}>{error}</Text>}
            </View>
        );
    }
};

Input.propTypes = {
    type: PropTypes.string, // Type of Input
    style: PropTypes.object, // Style of Input
    placeholder: PropTypes.string, // Placeholder of Input
    value: PropTypes.string, // Value of Input
    onChange: PropTypes.func, // OnChange of Input
    name: PropTypes.string.isRequired, // Name of Input
    error: PropTypes.string, // Error of Input
    floatText: PropTypes.string, // FloatText of Input
    disabled: PropTypes.bool, // Disabled of Input
    onClick: PropTypes.func, // Function for invoke some behavior when clicked on input
    onFocus: PropTypes.func, // Function to react on focus event
    onBlur: PropTypes.func, // Function to react on blur event
    secureTextEntry: PropTypes.bool, // Function to react on focus event
    // ref: PropTypes.element, // Reference to this Input

};
Input.defaultProps = {
    onFocus: noop,
    onBlur: noop,
    onChange: noop,
};