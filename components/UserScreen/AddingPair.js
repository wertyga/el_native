import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';

import { setSignPrice, fetchPairPrice } from 'actions';

import { Loading, Input } from 'common-components';

import { userScreenStyles } from './UserScreen.style';

export class AddingPairComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPrice: 0,
      value: '',
      loading: true,
      errors: {},
    };
  };

  componentDidMount() {
    const { getParam } = this.props.navigation;
    const { title } = getParam('pair') || {};
    this.props.fetchPairPrice(title)
        .then(price => {
          this.setState({ currentPrice: price.toFixed(8), loading: false });
        })
        .catch(err => {
          this.setState({ errors: err.response ? err.response.data : err.message, loading: false });
        });
  };

  onInputChange = (name, value) => {
    if (value.replace('.', '').match(/[A-Za-z]/)) return;
    this.setState({ value, errors: '' });
  }

  confirmSign = () => { // Send pair price to server
    const { value, setSignPrice } = this.state;
    if(!value) {
      this.setState({ errors: { inputError: 'Enter price' } });
      return;
    }

    this.setState({ loading: true });
    const { navigation: { getParam } } = this.props;

    const pair = getParam('pair');
    const userID = getParam('userID');
    return this.props.setSignPrice({
      pair: pair.title,
      price: value,
      userId: userID,
    })
        .then(() => {
          return this.goBack();
        })
        .catch(err => {
          this.setState({
            errors: {
              inputError: err.response ? err.response.data : err.message,
            },
            loading: false
          })
        });
  }

  goBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    const { containerStyle, navigation: { getParam } } = this.props;
    const { loading, errors: { globalError, inputError }, currentPrice, value } = this.state;
    const {
      addPair: addPairStyles,
      addPairHeader,
      addPairText,
      addPairContent,
      button,
      buttonText,
      buttonSuccess,
      buttonDanger,
    } = userScreenStyles;
    const mainStyle = { ...addPairStyles, ...containerStyle };
    const { name: pairName, title: pairTitle } = getParam('pair');

    return (
        <View
            style={mainStyle}
        >
          {!!loading && <Loading />}
          {!!globalError && <Text style={userScreenStyles.error}>{globalError}</Text>}

          <View style={addPairContent}>
            <Text style={addPairHeader}>{pairName}</Text>
            <Text style={addPairText}><Text>Current price: </Text>{currentPrice}</Text>
            <Input
                placeholder="Set your price..."
                value={value}
                onChange={this.onInputChange}
                disabled={loading}
                name="signPrice"
                inputRef={node => this.input = node}
                floatText="Sign price"
                error={inputError}
            />
          </View>
          <View>
            <TouchableOpacity
                style={buttonSuccess}
                onPress={this.confirmSign}
            >
              <Text style={buttonText}>Sign</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={buttonDanger}
                disabled={this.state.loading}
                onPress={this.goBack}
            >
              <Text style={buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>

    );
  }
}

// AddingPairComponent.propTypes = {
//   pair: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,                           // Pair
//   setSignPrice: PropTypes.func.isRequired, // Sending pair data action
//   fetchPairPrice: PropTypes.func.isRequired, // Fetch current price of symbol from DB
//   userId: PropTypes.string.isRequired, // User id
//   onClose: PropTypes.func.isRequired, // Close this modal window
// };

export const AddingPair = connect(null, { setSignPrice, fetchPairPrice })(AddingPairComponent);
