import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { setSeenPower, deletePower } from 'actions';

import { powerStyle } from './Power.style';

export const PairOneDetails = ({ close, high, percent, updatedAt, low }) => {
  const { textStyle, textBoldStyle, itemStyle } = powerStyle;
  return (
    <View style={itemStyle()}>
      {!!close && !!high &&
        <Fragment>
          <Text style={textBoldStyle}>From: <Text style={textStyle}>{percent > 0 ? low.toFixed(8) : high.toFixed(8)}</Text></Text>
          <Text style={textBoldStyle}>To: <Text style={textStyle}>{close.toFixed(8)}</Text></Text>
        </Fragment>
      }
    </View>
  );
}


class PowerOneComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: ''
    };
  };

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.bodyScroll)
  // };
  //
  // componentDidMount() {
  //   window.addEventListener('scroll', this.bodyScroll);
  //   setTimeout(this.bodyScroll, 1000);
  // };

  // bodyScroll = () => {
  //   if(!this.mainRef) return;
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   const  { bottom }  = this.mainRef.getBoundingClientRect();
  //   const totalHeight = scrollTop + window.innerHeight;
  //
  //   if((totalHeight > (bottom + 50 + scrollTop)) && !this.props.item.isSeen) {
  //     this.props.setSeenPower(this.props.user._id, this.props.item._id)
  //       .catch(err => {
  //         const errors = clearSession(this, err);
  //         if(errors) this.setState({ errors });
  //       })
  //   };
  // };

  render() {
    const { symbol, percent, close, high, low, updatedAt } = this.props;
    const { errors, disabled, style } = this.props;
    const quoteAsset = symbol.match(/BTC|ETH/);
    const { textTitleStyle, itemStyle, textStyle, textPositive, textNegative } = powerStyle;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={style}
      >
        {errors && <Text className="error">{errors}</Text>}

        <View style={itemStyle(true)}>
          <Text style={textTitleStyle}>
            {symbol.indexOf('USDT') !== -1 ? 'USDT' : symbol.split(quoteAsset)[0]} / {quoteAsset}
          </Text>
          {percent > 0 && <Text style={textPositive}>Grow for + {percent} %</Text>}
          {percent < 0 && <Text style={textNegative}>Crash down for {percent} %</Text>}
        </View>
        <Text style={textStyle}>{updatedAt.replace('Z', '').split('T').join(' ')}</Text>

      </TouchableOpacity>
    );
  };
};

PowerOneComponent.propTypes = {
  user: PropTypes.object.isRequired, // User data
  // item: PropTypes.object.isRequired, // Data for powerOne element
  deletePower: PropTypes.func.isRequired, // Delete power symbol element
  setSeenPower: PropTypes.func.isRequired, // Function for set power one to { isSeen: true }
  disabled: PropTypes.bool,
};

export const PowerOne = connect(null, { setSeenPower, deletePower })(PowerOneComponent);