import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';

import { remindPass, changePass } from 'actions';

import { inputsValidation } from 'common';

import { Input, Loading } from 'common-components';

import { remindStyles } from './remind.style';

class RemindComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      verifyCode: '',
      password: '',
      passwordConfirm: '',
      loading: false,
      changePass: false,
      modal: false,
      errors: {}

    };
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: '',
      }
    });
  };

  onSubmit = () => {
    Keyboard.dismiss();
    if(!this.state.username) {
      this.setState({ errors: { username: 'Field can not be blank' } });
    } else {
      this.setState({ loading: true });
      this.props.remindPass(this.state.username)
          .then(() => {
            this.setState({ loading: false, changePass: true, modal: true });
          })
          .catch(err => {
            this.setState({ loading: false, errors: err.response ? err.response.data.errors : { globalError: err.message } });
          })
    };
  };

  changePass = () => { // Changing password
    Keyboard.dismiss();
    const inputsObj = {
      verifyCode: {
        field: this.state.verifyCode,
        require: true
      },
      password: {
        field: this.state.password,
        require: true
      },
      passwordConfirm: {
        field: this.state.passwordConfirm,
        require: true
      },
    };

    const { isValid, errors } = inputsValidation(inputsObj);

    if(!isValid) {
      this.setState({ errors });
    } else {
      this.setState({ loading: true });
      this.props.changePass(inputsObj)
          .then(() => {
            this.props.history.replace('/')
          })
          .catch(err => {
            this.setState({
              loading: false,
              errors: err.response ? err.response.data.errors : { globalError: err.message }
            });
          })
    }
  };

  closeModal = () => { // Close modal window that appears while verify code was sent to user's email
    this.setState({ modal: false });
  };

  onFocusInput = () => {
    this.setState({
      errors: {
        ...this.state.errors,
        globalError: '',
      }
    });
  };

  render() {

    const username = (
        <Input
            placeholder="Enter username..."
            value={this.state.username}
            onChange={this.onChange}
            name="username"
            floatText='Username'
            error={this.state.errors.username}
            disabled={this.state.loading}
            onFocus={this.onFocusInput}
        />
    );

    const changePass = [
      <Input
          key='verifyCode'
          placeholder="Enter verify code..."
          value={this.state.verifyCode}
          onChange={this.onChange}
          name="verifyCode"
          floatText='Verify code'
          error={this.state.errors.verifyCode}
          disabled={this.state.loading}
          onFocus={this.onFocusInput}
      />,
      <Input
          key='password'
          placeholder="Enter new password..."
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          floatText='New password'
          error={this.state.errors.password}
          disabled={this.state.loading}
          onFocus={this.onFocusInput}
          secureTextEntry
      />,
      <Input
          key='passwordConfirm'
          placeholder="Confirm password..."
          value={this.state.passwordConfirm}
          onChange={this.onChange}
          name="passwordConfirm"
          floatText='Confirm password'
          error={this.state.errors.passwordConfirm}
          disabled={this.state.loading}
          onFocus={this.onFocusInput}
          secureTextEntry
      />
    ];

    const { containerStyle } = this.props;
    const mainStyle = {
      ...containerStyle,
      ...remindStyles.container,
    };
    return (
        <View style={mainStyle}>
          {this.state.loading && <Loading />}

          {!!this.state.errors.globalError
          && <Text style={remindStyles.globalError}>{this.state.errors.globalError}</Text>}

          <View>
            <Text style={remindStyles.upperText}>
              {this.state.changePass
                  ? 'Enter verification code from E-mail and new password'
                  : 'Enter login that you have been registered'
              }
            </Text>

            {this.state.changePass ? changePass : username}

            <View>
              {this.state.changePass ?
                  <TouchableOpacity
                      style={remindStyles.submitButton}
                      disabled={this.state.loading}
                      onClick={this.changePass}
                  >
                    <Text style={remindStyles.text}>Change password</Text>
                  </TouchableOpacity> :

                  <TouchableOpacity
                      style={remindStyles.submitButton}
                      onPress={this.onSubmit}
                      disabled={this.state.loading}
                  >
                    <Text style={remindStyles.text}>Confirm</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </View>
    );
  };
};

export const Remind = connect(null, { remindPass, changePass })(RemindComponent);