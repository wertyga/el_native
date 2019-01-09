import React, { Component } from 'react';
import { View, Text, Image, Linking, ScrollView, StyleSheet } from 'react-native';
import btcLogo from '../../assets/btc.png';

import { WithUserMenu } from 'common-components';

import { aboutStyle } from './About.style';
const { rowWrapperStyle, textStyle, elementStyle, textTitleStyle, wrapperStyle, linkStyle, lightTextStyle, scrollStyle } = aboutStyle;

@WithUserMenu
export class About extends Component {
  render() {

    return (
      <View style={wrapperStyle}>
        <ScrollView style={scrollStyle}>
          <View style={elementStyle}>
            <View>
              <Text style={textTitleStyle}>This application created by: </Text>
              <Text style={textStyle}>© WE.Technologies</Text>
            </View>
            <View>
              <Text style={textTitleStyle}>Contact information:</Text>
              <Text style={textStyle}>E-mail: cryptosigner.we@gmail.com</Text>
            </View>
          </View>

          <View style={elementStyle}>
            <Text style={textTitleStyle}>Support project by Cryptocurrency:</Text>
            {/*<Image source={btcLogo} />*/}
            <Text style={lightTextStyle}>18ikPNYocCZxkpUGdubhHuF9wuE4w4tpyt</Text>
          </View>

          <View style={elementStyle}>
            <Text style={textTitleStyle}>Description</Text>
            <View style={elementStyle}>
                <Text style={textStyle}>This application created for trading cryptocurrency in relation to Bitcoin and dedication for
                  <Text style={{ ...textTitleStyle, ...linkStyle }} onPress={() => Linking.openURL('https://binance.com')}> Binance.com </Text>
                   stock exchage.</Text>
                <Text style={{ ...elementStyle, ...textStyle }}>You can to assign sign price for certain cryptocurrency and if it reached this aim you  will be informed at once with
                  notification application itself or by emailing.
                </Text>

                <Text style={textStyle}>In this way you no need always track for price moving and risk your money.</Text>
                <Text style={textStyle}>In additionally you can cover all market with your entering points without the need to put buy order.</Text>
                <Text style={textStyle}>Besides the application provides information about buy/sell orders with big amount of deal that can helps you, if need, do some adjust your enter or exit point,
                  or focus and follow on some of them.
                </Text>
            </View>
            <View style={{ ...rowWrapperStyle }}>
              <Text style={textStyle}>Yours: </Text>
              <Text style={textStyle}>Crypto_signer team</Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}