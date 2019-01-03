import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Text, TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';

import { clearSession } from 'common';

import { Input } from 'common-components';

import { changableInputStyles as style } from './ChangableInput.style';

export class ChangableInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.text,
            text: props.text,
            editing: false,
            loading: false,
            errors: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.editing !== prevState.editing) {
            const { isEditing, name } = this.props;
            if (this.state.editing) {
                isEditing(name);
            } else {
                isEditing('');
            }
        }
    }

    onChangeInput = (name, value) => {
        this.setState({
            value,
            errors: ''
        })
        this.props.clearError();
    }

    confirm = () => {
        const { value, text } = this.state;
        const { validateText, confirmChanging } = this.props;
        if (value === text) {
            this.cancelChanging();
            return;
        }
        const errors = validateText(value);
        if (!value || errors) {
            this.setState({ errors: errors || 'Field can not be blank' });
            return;
        }

        this.setState({ loading: true });
        return confirmChanging(value)
            .then(() => {
                this.setState({ text: value, editing: false, loading: false });
            })
            .catch(err => {
                const errors = clearSession(this, err);
                if(errors) {
                    this.setState({ errors: clearSession(this, err), loading: false });
                }
            })
    }

    cancelChanging = () => {
        this.setState({ value: this.state.text, editing: false, errors: '' });
    }

    setEditing = () => this.setState({ editing: true });

    render() {

        const { loading, value, errors, editing, text } = this.state;
        const { name, disabled, floatText, textStyle, inputStyle } = this.props;
        const { check, wrapperIconsStyle, times, buttonStyle, underlayColor } = style;

        const checkStyle = check(loading);
        const timesStyle = times(loading);

        return (
            <TouchableHighlight
                className="ChangableInput"
                onPress={this.setEditing}
                underlayColor={underlayColor}
            >
                {editing ?
                    <View>
                        <Input
                            inputStyle={inputStyle}
                            inputRef={this.input}
                            onChange={this.onChangeInput}
                            value={value}
                            disabled={loading || disabled}
                            name={name}
                            floatText={floatText}
                            error={errors}
                            onFocus={this.onFocus}
                            autoFocus
                        />
                        <View style={wrapperIconsStyle}>
                            <Button
                                raised
                                disabled={loading}
                                icon={{
                                  name: 'check',
                                  type: 'font-awesome',
                                }}
                                {...checkStyle}
                                buttonStyle={buttonStyle}
                                title="Confirm"
                                onPress={this.confirm}
                            />
                            <Button
                                raised
                                disabled={loading}
                                icon={{
                                  name: 'times',
                                  type: 'font-awesome',
                                }}
                                {...timesStyle}
                                buttonStyle={buttonStyle}
                                title="Deny"
                                onPress={this.cancelChanging}
                            />
                        </View>
                    </View> :
                    <Text className="text" style={textStyle}>{text}</Text>
                }
            </TouchableHighlight>
        );
    }
}

ChangableInput.defaultProps = {
    clearError: noop,
    validateText: noop,
    textStyle: {},
    inputStyle: {},
}

ChangableInput.propTypes = {
    text: PropTypes.string.isRequired, // Simple text
    floatText: PropTypes.string,
    disabled: PropTypes.bool, // Disable input
    confirmChanging: PropTypes.func, // Function to confirm changing in parent component, that returns changed text (like: fetching changing to DB)
    validateText: PropTypes.func, // Validate text changing from parent component
    clearError: PropTypes.func,
    isEditing: PropTypes.func, // Sign if component is editing now
    name: PropTypes.string, // Input field name
    textStyle: PropTypes.object,
    inputStyle: PropTypes.object,
};