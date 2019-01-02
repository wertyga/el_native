import React from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import noop from 'lodash/noop';

import { styleToggle } from './Toggle.style';

export class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      thumbLeft: new Animated.Value(this.props.open ? 20 : 0),
    };
  };

  onChange = () => {
    this.setState({
      open: !this.state.open
    }, () => {
      Animated.timing(
          this.state.thumbLeft,
          {
            toValue: this.state.open ? 20 : 0,
            duration: 200,
          }
      ).start();

      this.props.onChange();
    });
  };

  render() {
    const closeRouteStyle = styleToggle.route;
    const openRouteStyle = { ...styleToggle.route, ...styleToggle.routeOpen };
    const closeThumbStyle = { ...styleToggle.thumb, left: this.state.thumbLeft };
    const openThumbStyle = { ...styleToggle.thumb, ...styleToggle.thumbOpen, left: this.state.thumbLeft };

    const { username } = this.props;

    return (
        <View style={styleToggle.wrapper}>
          <View style={styleToggle.main}>
            <TouchableOpacity onPress={this.onChange} style={this.state.open ? openRouteStyle : closeRouteStyle}>
              <Animated.View style={this.state.open ? openThumbStyle : closeThumbStyle}></Animated.View>
            </TouchableOpacity>
            {!!this.props.label && <Text style={styleToggle.label}>{this.props.label}</Text>}
          </View>
          <Text style={styleToggle.text}>{username}</Text>
        </View>
    );
  };
};

Toggle.defaultProps = {
  onChange: noop,
};