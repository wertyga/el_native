import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Keyboard, TouchableOpacity, AsyncStorage } from 'react-native';

import { Loading, Input, Link } from "common-components";
import { inputsValidation } from 'common';

import { userAuth, userSignUp } from "actions";

import { style } from './loginScreen.style';

class LogInScreenComponent extends Component {
    constructor(props) {
        super(props);

        this.isSignup = props.screen === 'signup';
        this.inputFields = this.isSignup ? ['username', 'email', 'password', 'passConf'] : ['username', 'password'];
        const inputs = this.inputFields.reduce((a, b) => ({ ...a, [b]: '' }), {});
        this.state = {
            ...inputs,
            errors: {},
            loading: false
        };

      props.navigation.addListener(
          'didBlur',
          payload => {
            this.setState({ errors: {} });
          }
      );
    };

    componentDidMount() {
      Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('id'),
      ]).then(([token, id]) => {
        if (token && id) {
          this.props.navigation.navigate('MainScreen', { userID: id })
        }
      });
    }

    componentDidUpdate({ navigation }) {
      if (this.props.navitagion)
      this.setState({ errors: {} });
    }

    onChange = (name, value) => { // Change handler of input
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: '',
                globalError: '',
            }
        });
    };

    getNavigateParams = (id) => {
      return this.isSignup ?
          {
            route: 'VerifyUserScreen',
            params: { verifyID: id },
          } :
          {
            route: 'MainScreen',
            params: {},
          };
    }

    onSubmit = () => { // Login user
        const sendObject = this.inputFields
            .reduce((a, b) => ({ ...a, [b]: { field: this.state[b], require: true } }), {});

        const { isValid, errors } = inputsValidation(sendObject);

        if(isValid) {
          this.setState({ loading: true, errors: {}});
          const { navigate } = this.props.navigation;
          Keyboard.dismiss();

          const url = this.isSignup ? '/auth/sign-up' : '/auth/login';
          const authAction = this.isSignup ? 'userSignUp' : 'userAuth';

          this.props[authAction]({...sendObject, url })
              .then(res => {
                this.setState({ loading: false });
                const routeParams = this.getNavigateParams((res.data || {})._id);
                navigate(routeParams.route, routeParams.params);
              })
              .catch(err => {
                this.setState({
                  loading: false,
                  errors: err.response ? err.response.data.errors : { globalError: err.message }
                });
              })
        } else {
          this.setState({
            errors
          })
        }
    };

    signup = () => {
        const { navigate } = this.props.navigation;
        if (!this.isSignup) {
          navigate('SignupScreen');
          return;
        }
        this.onSubmit();
    };

    remind = () => {
      const { navigate } = this.props.navigation;
      navigate('RemindScreen');
    }


    render() {
        const { errors, loading } = this.state;
        const { globalError = '' } = errors;
        const { containerStyle } = this.props;
        return (
            <View style={containerStyle}>
                {!!globalError && <Text style={style.globalError}>{globalError}</Text>}
                {loading  && <Loading />}
                <View
                    disabled={loading}
                    style={style.form}
                >
                    {this.inputFields.map((name) => (
                        <Input
                            key={name}
                            value={this.state[name]}
                            onChange={this.onChange}
                            name={name}
                            placeholder={name !== 'passConf' ? `Enter ${name}...` : 'Password confirmation'}
                            floatText={name !== 'passConf' ? `Enter your ${name}` : 'Enter password confirmation'}
                            error={this.state.errors[name]}
                            secureTextEntry={name === 'password' || name === 'passConf'}
                        />
                    ))}
                </View>
                <View>
                  {!this.isSignup &&
                      <TouchableOpacity
                          onPress={this.onSubmit}
                          style={style.submitButton}
                      >
                          <Text style={style.submitButtonText}>Sign-In</Text>
                      </TouchableOpacity>
                  }

                    <TouchableOpacity
                        onPress={this.signup}
                        style={style.submitButton}
                    >
                        <Text style={style.submitButtonText}>
                            Sign-Up/Registration
                        </Text>
                    </TouchableOpacity>
                </View>

              {!this.isSignup && <Link style={style.remind} to="RemindScreen" text="Forgot password?" />}
            </View>
        );
    };
};

LogInScreenComponent.propTypes = {
    userAuth: PropTypes.func.isRequired, //Login and registration action
    screen: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    navigation:
};

export const LoginScreen = connect(null, { userAuth, userSignUp })(LogInScreenComponent);