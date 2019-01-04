import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { getWhaleOrders, getUserData } from 'actions';

import { WhaleButton } from './WhaleButton';
import { Loading, Input } from 'common-components';

const optionValues = [3, 5, 6, 8, 10, 20, 50].map(item => String(item));

class WhalesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: this.props.orders || [],
            loading: true,
            close: [],
            chosen: 'bids',
            quoteAsset: 'btc',
            optionValue: optionValues[4],
            errors: ''
        };
    };

    componentDidMount() {
        this.input.addEventListener('keyup', this.sortOrders)
        return this.getWhaleOrders()
            .then(() => this.setState({ loading: false }))
            .catch(err => {
                this.setState({
                    errors: err.response ? err.response.data.errors : err.message,
                    loading: false
                });
            })
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.orders !== prevProps.orders) {
            this.setState({ orders: this.props.orders });
        };

        if((this.state.loading !== prevState.loading) && this.state.loading && this.state.errors) {
            this.setState({ errors: '' });
        };
    };

    getWhaleOrders = () => {
        const { optionValue, chosen, quoteAsset } = this.state;
        return this.props.getWhaleOrders(optionValue, chosen, quoteAsset);
    };

    closePress = id => {
        const existItem = this.state.close.find(item => item === id);
        this.setState({
            close: !existItem ? [...this.state.close, id] : this.state.close.filter(item => item !== id)
        })
    };

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
        if(!this.state.optionValue && this.state.loading) return;

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

        const angleDown = <Button
            buttonStyle={{}}
            icon={{ name: 'fa-angle-down', type: 'font-awesome' }}
        />;
        const angleUp = <Button
            buttonStyle={{}}
            icon={{ name: 'fa-angle-up', type: 'font-awesome' }}
        />;
        const reload = <Button
            buttonStyle={{}}
            icon={{ name: 'fa-sync-alt', type: 'font-awesome' }}
            onPress={this.sortOrders}
        />;

        const { optionValue, loading, errors, chosen, quoteAsset, orders, close } = this.state;

        return (
            <View className="Whales">
                {!!errors && <Text className="error">{errors}</Text>}
                {loading && <Loading />}
                <View className="whales_wrapper">
                    <View className="input">
                        <Text className="strong">Select currency value</Text>
                        <input
                            name="whales"
                            value={optionValue}
                            onChange={this.onChangeOption}
                            disabled={loading}
                        />
                        {reload}
                    </View>

                    <View className="orders">
                        <View className="orders_buttons__buy-sell">
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
                        <View className="orders_buttons__currency">
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
                            <View className="order" key={item._id}>
                                <TouchableOpacity className="symbol" onPress={this.closePress.bind(this, item._id)}>
                                    <View>
                                        <Text>{item.symbol.replace(item.quoteAsset, `/${item.quoteAsset}`)}</Text>
                                        {!close.find(pair => pair === item._id) ? angleDown : angleUp}
                                    </View>
                                </TouchableOpacity>
                                <View className={close.find(pair => pair === item._id) ? 'data close' : 'data'}>
                                    {item.orders.map((order, i) =>
                                        <View key={i}>
                                            <Text>Price: {order.price.toFixed(8)}</Text>
                                            <Text>Amount: {order.amount}</Text>
                                            <Text>Total amount: {order.totalAmount} {item.quoteAsset}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        {orders.length < 1 && !loading && <Text className="empty">This stash is empty now</Text>}
                    </View>
                </View>
            </View>
        );
    };
};

Whales.propTypes = {
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