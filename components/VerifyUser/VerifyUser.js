import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { Loading, Input } from 'common-components';
import { verifyUserCodeWithSignUp } from "actions";

import { verifyUserStyles } from './verifyUser.styles';

class VerifyUserComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      verifyCode: '',
      errors: {},
    };
  };

  onChange = (name, value) => {
    this.setState({
      verifyCode: value,
    });
  };

  submit = () => {
    this.setState({ loading: true });
    const { verifyCode } = this.state;
    const { navigation: { navigate }, navigation } = this.props;

    const verifyID = navigation.getParam('verifyID', false);

    this.props.verifyUserCodeWithSignUp(verifyID, verifyCode)
        .then(id => {
          navigate('MainScreen', { userID: id });
        })
        .catch(e => {
          this.setState({
            errors: e.response ? e.response.data.errors : { globalError: e.message },
            loading: false,
          })
        });
  };

  render() {
    const { containerStyle } = this.props;
    const { loading, errors: { globalError = false, verifyCode: verifyError = '' }, verifyCode } = this.state;

    return (
        <View style={containerStyle}>
          {loading  && <Loading />}
          <View style={verifyUserStyles.form}>
            {!!globalError && <Text className="error">{globalError}</Text>}

            <Input
                placeholder="Enter verify code..."
                value={verifyCode}
                onChange={this.onChange}
                name="Verify code"
                floatText='Verify code'
                error={verifyError}
                disabled={loading}
            />
            <TouchableOpacity
                className="primary submit_button"
                disabled={loading || !verifyCode}
                style={verifyUserStyles.button}
                onPress={this.submit}
            >
              <Text style={verifyUserStyles.button.text}>Verify</Text>
            </TouchableOpacity>

          </View>
        </View>
    );
  };
};

export const VerifyUser = connect(null, { verifyUserCodeWithSignUp })(VerifyUserComponent);