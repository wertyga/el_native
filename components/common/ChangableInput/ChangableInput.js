import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                this.input.focus();
                isEditing(name);
            } else {
                this.input.blur();
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
        const { name, disabled, floatText } = this.props;

        return (
            <TouchableHighlight
                className="ChangableInput"
                onPress={this.setEditing}
            >
                {editing &&
                    <View>
                        <Input
                            inputRef={node => this.input = node}
                            onChange={this.onChangeInput}
                            value={value}
                            disabled={loading || disabled}
                            name={name}
                            floatText={floatText}
                            error={errors}
                            onFocus={this.onFocus}
                        />
                        <Icon.Button
                            {...style.check(loading)}
                            name="check-circle"
                            onPress={this.confirm}
                        />
                        <Icon.Button
                            {...style.times(loading)}
                            name="times-circle"
                            onPress={this.cancelChanging}
                        />
                    </View>
                }
                {!editing && <Text className="text">{text}</Text>}
            </TouchableHighlight>
        );
    }
}

ChangableInput.defaultProps = {
    clearError: noop,
    validateText: noop,
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
};