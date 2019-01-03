import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';

import { confirmChanging, subscribing } from 'actions';
import { validateEmail } from 'common';
import { Loading, ChangableInput } from 'common-components';

class UserSettingsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            littleLoading: false,
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

        this.setState({ littleLoading: true, errors: '' });
        subscribing(_id, sendObj)
            .then(() => {
                this.setState({littleLoading: false})
            })
            .catch(err => {
                if(err.response && err.response.status === 401) {
                    this.setState({
                        littleLoading: false,
                        errors: 'Access denided: reload the application'
                    })
                } else if(err.response && err.response.status === 403 && err.response.data.redirect) {
                    navigate('MainScreen');
                } else {
                    this.setState({
                        littleLoading: false,
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

        return (
            <View style={containerStyle}>
                {loading && <Loading />}
                <Text>Settings:</Text>
                {errors && <Text className="error">{errors}</Text>}
                <View>
                    <Text>Name: </Text>
                    <ChangableInput
                        text={username}
                        confirmChanging={(text) => confirmChanging(_id, 'username', text)}
                        clearError={this.clearError}
                        disabled={loading}
                        isEditing={this.isEditing}
                        floatText="Username"
                        name="username"
                    />
                </View>
                <View>
                    <Text>E-mail: </Text>
                    <ChangableInput
                        text={email}
                        confirmChanging={(text) => confirmChanging(_id, 'email', text)}
                        clearError={this.clearError}
                        disabled={loading}
                        validateText={this.validateEmailData}
                        isEditing={this.isEditing}
                        floatText="E-mail"
                        name="email"
                    />
                </View>
                <View className="extention">
                    <Text>Is extention account:</Text>
                    <Text className={isCool ? 'positive' : 'negative'}>{isCool ? 'Yes' : 'No'}</Text>
                </View>
                <View className="subscribe">
                    <Text>Subscribing to e-mail sending: </Text>
                    <Switch
                        disabled={littleLoading}
                        value={isReceiveMail.main}
                        onValueChange={() => this.subscribingChange('main')}
                    />
                </View>
                {isCool &&
                <View className="subscribe">
                    <Text>Subscribing to e-mail sending for power symbols: </Text>
                    <Switch
                        disabled={littleLoading}
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

