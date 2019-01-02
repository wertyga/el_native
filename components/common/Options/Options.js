import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { View, Text, FlatList, Keyboard, Dimensions } from 'react-native';

import { Input } from 'common-components';

import { optionStyles } from './Option.style';

const listHeightPercent = 0.6;

export class Options extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setName: this.setName(),
      startScroll: false,
      listHeight: Dimensions.get('window').height * listHeightPercent,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidUpdate(prevProps) {
    if(this.props.value !== prevProps.value) {
      this.setState({
        setName: this.setName()
      });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({
      listHeight: Dimensions.get('window').height * listHeightPercent - e.endCoordinates.height,
    });
  }
  _keyboardDidHide = (e) => {
    this.setState({
      listHeight: Dimensions.get('window').height * listHeightPercent,
    });
  }

  setName = () => {
    const name = this.props.items.find(item => item.title === this.props.value);
    return name ? name.name : this.props.value
  }

  onChange = (name, value) => {
    this.props.onInputChange(value);
  }

  onInputFocus = () => {
    if(this.props.disable) return;
    this.setState({ open: true, startScroll: false });
  }

  onInputBlur = () => {
    if(this.props.disable) return;
    if (!this.state.startScroll) {
      this.setState({ open: false });
    }
  }

  onSelect = (title) => {
    this.setState({
      open: false,
      startScroll: false,
    }, () => this.props.onSelect(title));
  }

  renderItem = ({ item: { title, name } }) => {
    return <Text style={optionStyles.item} onPress={() => this.onSelect(title)}>{name}</Text>
  }

  keyExtractor = (item) => item.title;

  onScrollStart = () => {
    this.setState({ startScroll: true });
    Keyboard.dismiss();
  }

  render() {

    const { items } = this.props;
    const listStyles = { ...optionStyles.list, maxHeight: this.state.listHeight };
    return (
        <View>
          <View className="main-select">
            {!this.props.disable ?
                <Input
                    name="optionInput"
                    placeholder='Choose pair...'
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    value={this.props.value}
                    onChange={this.onChange}
                    floatText={this.props.floatText}
                    error={this.props.error}
                /> :
                <Text className="loading">{this.props.disableValue}</Text>
            }
            {this.state.open &&
              !this.props.disable &&
              this.props.items.length > 0 &&

              <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  style={listStyles}
                  data={items}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  onMomentumScrollBegin={this.onScrollStart}
              />
            }
          </View>
        </View>
    );
  };
};

Options.defaultProps = {
  onChange: noop,
  onFilter: noop,
  onSelect: noop,
}

Options.propTypes = {
  onChange: PropTypes.func.isRequired, //Func for searching value
  label: PropTypes.string, // Label for select
  value: PropTypes.string.isRequired, //Current value of select
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired, //title of inner value of the select
    name: PropTypes.string.isRequired, //name of visible value of the select
  })).isRequired,
  emptyValue: PropTypes.string, //Empty value
  onSelect: PropTypes.func.isRequired, //Function for changing between options with 'title' param
  loading: PropTypes.bool, //Loading
  disableValue: PropTypes.node ,// Some value when is Loading
  disable: PropTypes.bool,// Boolean value for disabling
  floatingText: PropTypes.string,
}