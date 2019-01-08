import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { updatePrice } from 'actions';

import { pairStyles } from './Pair.style';

export const PairDown = ({ prevPrice, signPrice, style = {} }) => {
  const { downStyle, priceTextStyle, priceStyle, itemViewStyle } = pairStyles;
  const mainStyle = { ...downStyle, ...style };
  return (
    <View style={mainStyle}>

      <View style={itemViewStyle}>
        <Text style={priceTextStyle}>Previous price</Text>
        <Text style={priceStyle}>{prevPrice}</Text>
      </View>

      <View style={itemViewStyle}>
        <Text style={priceTextStyle}>Purpose price</Text>
        <Text style={priceStyle}>{signPrice}</Text>
      </View>

    </View>
  );
}

export class Pair extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: `${props.baseAsset}/${props.quoteAsset}`,
      diffPrice: 0,
      errors: '',
      loading: false,
    };
  };

  componentDidMount() {
    this.comparePriceDifferent();
  };

  componentDidUpdate(prevProps) {
    if(this.props.price !== prevProps.price || this.props.prevPrice !== prevProps.prevPrice) {
      this.comparePriceDifferent();
    };
  };


  comparePriceDifferent = () => { // Compare different between current - and previous price
    const { price, prevPrice } = this.props;
    const diffPrice = (price - prevPrice).toFixed(8);
    if(diffPrice < 0) {
      this.setState({
        diffPrice
      });
    } else {
      this.setState({
        diffPrice: `+${diffPrice}`
      });
    }
  };

  onClose = () => {
    if(this.state.loading) return;
    this.setState({ loading: true });
    this.props.onClose(this.props._id)
        .catch(err => this.setState({ errors: err.response ? err.response.data : err.message}))
  };

  render() {

    const { baseAsset, quoteAsset, price, sign, updatedAt, style = {} } = this.props;
    const { diffPrice, loading } = this.state;

    const {
      textBold,
      textLight,
      priceTextStyle,
      priceStyle,
      upperStyle,
      wrapperStyle,
      diffPriceWrappeStyle,
      reachedPriceStyle,
      isUpPriceStyle,
      itemViewTitle,
      signStyle,
      wrapperContent,
    } = pairStyles;

    const mainStyle = { ...wrapperStyle, ...style };

    return (
        <View
             style={mainStyle}
        >

          {sign && <View style={signStyle}/>}

          <View style={wrapperContent}>
            {!!this.state.errors && <Text className="error">{this.state.errors}</Text>}

            <View style={upperStyle}>
              <View style={itemViewTitle}>
                <Text style={textBold}>{baseAsset}</Text>
                <Text style={textLight}>{` / ${quoteAsset}`}</Text>
              </View>

              <Text style={priceStyle}>{price}</Text>

              <View style={diffPriceWrappeStyle}>
                <Text style={isUpPriceStyle(diffPrice, loading)}>{diffPrice}</Text>
              </View>

            </View>

            {sign &&
            <View style={reachedPriceStyle}>
              <Text style={priceTextStyle}>Reached time</Text>
              <Text style={priceStyle}>
                {updatedAt.split('.')[0].split('T')[0]}
              </Text>
              <Text style={priceStyle}>
                {updatedAt.split('.')[0].split('T')[1]}
              </Text>
            </View>
            }
          </View>

        </View>
    );
  };
};