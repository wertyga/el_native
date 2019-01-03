import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';

import { confirmChanging, subscribing } from 'actions';
import { validateEmail } from 'common';
import { Loading, ChangableInput } from 'common-components';

import { userSettingsStyle } from './UserSettings.style';

const { mainStyle, textStyle, inputWrapperStyle, rowWrapperStyle, colorizeTextStyle, changableTextStyle } = userSettingsStyle;

class UserSettingsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            littleLoading: {},
            isEditing: '',
            errors: ''
        }
    }

    clearError = () => { this.setState({ errors: ''}) }

    validateEmailData = email => {
        if(!validateEmail(email)) {
            return 'E-mail not confirmed'
        } else {
            return false;
        }
    }

    isEditing = inputName => { this.setState({ isEditing: inputName }) }

    subscribingChange = (sign) => {
        const { user: { isReceiveMail, _id }, subscribing, navigation: { navigate } } = this.props;
        const sendObj = {
            main: sign === 'main' ? !isReceiveMail.main : isReceiveMail.main,
            power: sign === 'power' ? !isReceiveMail.power : isReceiveMail.power,
        };

        this.setState({ littleLoading: { ...this.state.littleLoading, [sign]: true }, errors: '' });
        subscribing(_id, sendObj)
            .then(() => {
                this.setState({littleLoading: { ...this.state.littleLoading, [sign]: false } })
            })
            .catch(err => {
                if(err.response && err.response.status === 401) {
                    this.setState({
                        littleLoading: { ...this.state.littleLoading, [sign]: false },
                        errors: 'Access denided: reload the application'
                    })
                } else if(err.response && err.response.status === 403 && err.response.data.redirect) {
                    this.setState({littleLoading: { ...this.state.littleLoading, [sign]: false } })
                    navigate('MainScreen');
                } else {
                    this.setState({
                        littleLoading: { ...this.state.littleLoading, [sign]: false },
                        errors: err.response ? err.response.data.errors : err.message
                    })
                }
            })
    }

    render() {

        const { loading, errors, littleLoading } = this.state;
        const { user: { username, _id, email, isCool, isReceiveMail },
            confirmChanging,
            containerStyle,
        } = this.props;

        const container = { ...containerStyle, ...mainStyle };

        return (
            <View style={container}>
                {!!loading && <Loading />}
                {!!errors && <Text className="error">{errors}</Text>}
                <View>
                    <View style={inputWrapperStyle}>
                        <Text style={textStyle}>Name:</Text>
                        <ChangableInput
                            text={username}
                            confirmChanging={(text) => confirmChanging(_id, 'username', text)}
                            clearError={this.clearError}
                            disabled={loading}
                            isEditing={this.isEditing}
                            name="username"
                            textStyle={changableTextStyle}
                        />
                    </View>
                    <View style={inputWrapperStyle}>
                        <Text style={textStyle}>E-mail:</Text>
                        <ChangableInput
                            text={email}
                            confirmChanging={(text) => confirmChanging(_id, 'email', text)}
                            clearError={this.clearError}
                            disabled={loading}
                            validateText={this.validateEmailData}
                            isEditing={this.isEditing}
                            name="email"
                            textStyle={changableTextStyle}
                        />
                    </View>
                </View>

                <View style={rowWrapperStyle}>
                    <Text style={textStyle}>Is extention account:</Text>
                    <Text style={colorizeTextStyle(isCool)}>{isCool ? 'Yes' : 'No'}</Text>
                </View>
                <View style={rowWrapperStyle}>
                    <Text style={textStyle}>Subscribing to e-mail sending: </Text>
                    <Switch
                        disabled={littleLoading.main}
                        value={isReceiveMail.main}
                        onValueChange={() => this.subscribingChange('main')}
                    />
                </View>
                {!!isCool &&
                <View style={rowWrapperStyle}>
                    <Text style={textStyle}>Subscribing to e-mail sending for power symbols: </Text>
                    <Switch
                        disabled={littleLoading.power}
                        value={isReceiveMail.power}
                        onValueChange={() => this.subscribingChange('power')}
                    />
                </View>
                }
            </View>
        );
    }
}

UserSettingsComponent.propTypes = {
    user: PropTypes.object.isRequired,
    confirmChanging: PropTypes.func.isRequired,
    subscribing: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    containerStyle: PropTypes.object,
}

const mapState = ({ user }) => {
    return {
        user,
    }
};

export const UserSettings= connect(mapState, { confirmChanging, subscribing })(UserSettingsComponent);

