import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
// import  from 'react-native-vector-icons';

import { updatePrice } from 'actions';

import { pairStyles } from './Pair.style';

class PairComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: `${props.baseAsset}/${props.quoteAsset}`,
      diffPrice: 0,
      errors: '',
      loading: false
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

    const { baseAsset, quoteAsset, signPrice, price, prevPrice, sign, updatedAt } = this.props;
    const { diffPrice, loading } = this.state;

    const {
      itemViewStyle,
      textBold,
      textLight,
      priceTextStyle,
      priceStyle,
      upperStyle,
      downStyle,
      wrapper,
      diffPriceNegative,
      diffPricePositive,
      diffPriceWrappeStyle,
      reachedPriceStyle,
      isUpPriceStyle,
      itemViewTitle,
      loadingStyle,
    } = pairStyles;

    return (
        <TouchableOpacity
             onPress={this.onClose}
             style={wrapper(sign, loading)}
             // onMouseDown={e => e.currentTarget.classList.add('active')}
             // onMouseUp={e => e.currentTarget.classList.remove('active')}
        >
          {!!this.state.errors && <Text className="error">{this.state.errors}</Text>}

          <View style={upperStyle}>
            <View style={itemViewTitle}>
              <Text style={textBold}>{baseAsset}</Text>
              <Text style={textLight}>{` / ${quoteAsset}`}</Text>
            </View>

            <Text style={priceStyle}>{price}</Text>

            <View style={diffPriceWrappeStyle}>
              <Text style={isUpPriceStyle(diffPrice, loading)}>{diffPrice}</Text>
              {/*<i className="fas fa-arrow-alt-circle-up"></i>*/}
            </View>

          </View>

          <View style={downStyle}>

            <View>
              <Text style={priceTextStyle}>Previous price</Text>
              <Text style={priceStyle}>{prevPrice}</Text>
            </View>

            <View style={itemViewStyle}>
              <Text style={priceTextStyle}>Purpose price</Text>
              <Text style={priceStyle}>{signPrice}</Text>
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


        </TouchableOpacity>
    );
  };
};

export const Pair = connect(null, { updatePrice })(PairComponent);