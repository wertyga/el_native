import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import { View, Text, TouchableOpacity, ScrollView, Transforms, Animated, Easing } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons';

import { getWhaleOrders, getUserData } from 'actions';

import { WhaleButton } from './WhaleButton';
import { Loading, Input, WithUserMenu } from 'common-components';

import { whalesStyle } from './Whales.style';
const {
  textStyle,
  containerStyle,
  scrollStyle,
  inputStyle,
  textBoldStyle,
  inputWrapperStyle,
  buttonWrapperStyle,
  textPairStyle,
  orderStyle,
  emptyStyle,
  backgroundColor,
  globalError,
} = whalesStyle;

const optionValues = [3, 5, 6, 8, 10, 20, 50].map(item => String(item));

@WithUserMenu
class WhalesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: this.props.orders || [],
            loading: true,
            chosen: 'bids',
            quoteAsset: 'btc',
            optionValue: optionValues[4],
            errors: ''
        };

        this.spinValue = new Animated.Value(0);
        this.animateLoading = Animated.timing(this.spinValue,
            {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
            }
        );
    }

    componentDidMount() {
        return this.getWhaleOrders()
            .then(() => this.setState({ loading: false }))
            .catch(err => {
                this.setState({
                    errors: err.response ? err.response.data.errors : err.message,
                    loading: false
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.loading) {
        this.animateLoadingStart();
      }
      if(this.props.orders !== prevProps.orders) {
            this.setState({ orders: this.props.orders });
        }

      if (this.state.loading !== prevState.loading) {
        this.setState({ errors: '' });
      }
    }

    animateLoadingStart = () => {
      this.spinValue.setValue(0);
      this.animateLoading.start(() => this.state.loading && this.animateLoadingStart());
    }

    getWhaleOrders = () => {
        const { optionValue, chosen, quoteAsset } = this.state;
        return this.props.getWhaleOrders(optionValue, chosen, quoteAsset);
    }

    onChangeOption = (name, value) => {
        if(isNaN(value)){
            return;
        } else {
            this.setState({
                optionValue: String(value.replace(/\.|,/, '')),
            });
        };
    };

    sortOrders = () => {
        if(!this.state.optionValue || this.state.loading) return;

        this.setState({loading: true});
        return this.getWhaleOrders()
            .then(() => {
                this.setState({loading: false});
            })
            .catch(err => {
                this.setState({
                    errors: err.response ? err.response.data.errors : err.message,
                    loading: false
                });
            })
    };

    setActive = (sign, chosen) => this.setState({ [chosen]: sign });

    render() {

        const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        const reload = (
          <Button
            raised
            icon={{ name: 'cached', size: 30, style: { marginRight: 0 } }}
            title=""
            textStyle={{ display: 'none' }}
            buttonStyle={{
              backgroundColor: backgroundColor,
            }}
            onPress={this.sortOrders}
          />
        );

        const { optionValue, loading, errors, chosen, quoteAsset, orders } = this.state;

        return (
            <View style={containerStyle}>
                {!!errors && <Text style={globalError}>{errors}</Text>}
                {loading && <Loading />}
                <ScrollView
                    style={scrollStyle}
                    indicatorStyle="white"
                    bounces={false}
                    scrollEnabled={!loading}
                >
                    <View style={inputWrapperStyle}>
                        <View style={inputStyle}>
                            <Text style={textStyle}>Select currency value</Text>
                            <Input
                                name="whales"
                                value={optionValue}
                                onChange={this.onChangeOption}
                                disabled={loading}
                                placeholder="Enter value for sort..."
                            />
                        </View>
                        <Text style={textBoldStyle}>{`.${quoteAsset.toUpperCase()}`}</Text>
                        {reload}
                    </View>

                    <View className="orders">
                        <View style={buttonWrapperStyle}>
                            <WhaleButton
                                className="buyOrders"
                                text="Buy orders"
                                active={chosen === 'bids'}
                                onPress={this.setActive.bind(this, 'bids', 'chosen')}
                            />
                            <WhaleButton
                                className="sellOrders"
                                text="Sell orders"
                                active={chosen === 'asks'}
                                onPress={this.setActive.bind(this, 'asks', 'chosen')}
                            />
                        </View>
                        <View style={buttonWrapperStyle}>
                            <WhaleButton
                                text="BTC"
                                active={quoteAsset === 'btc'}
                                onPress={this.setActive.bind(this, 'btc', 'quoteAsset')}
                            />
                            <WhaleButton
                                text="ETH"
                                active={quoteAsset === 'eth'}
                                onPress={this.setActive.bind(this, 'eth', 'quoteAsset')}
                            />
                        </View>

                        {orders.map(item =>
                            <View style={orderStyle} key={item._id}>
                                <Text style={textPairStyle}>{item.symbol.replace(item.quoteAsset, `/${item.quoteAsset}`)}</Text>
                                <View>
                                    {item.orders.map((order, i) =>
                                        <View key={i}>
                                            <Text style={textStyle}>Price: {order.price.toFixed(8)}</Text>
                                            <Text style={textStyle}>Amount: {order.amount}</Text>
                                            <Text style={textStyle}>Total amount: {order.totalAmount} {item.quoteAsset}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        {orders.length < 1 && !loading && <Text style={emptyStyle}>This stash is empty now</Text>}
                    </View>
                </ScrollView>
            </View>
        );
    };
};

WhalesComponent.propTypes = {
    getUserData: PropTypes.func.isRequired, // Get User data if that is empty(reload page example)
    getWhaleOrders: PropTypes.func.isRequired, // Fetch whales orders
};

const mapState = ({ whaleOrders, user }) => {
    return {
        orders: whaleOrders,
        user,
    };
};

export const Whales = connect(mapState, { getWhaleOrders, getUserData })(WhalesComponent);