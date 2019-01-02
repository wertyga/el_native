import React, { Component } from 'react';
import { AppLoading } from "expo";

import { RootComponent } from "components";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isReady: false,
        };
    }

    _loadFonts = async () => {
        return Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadFonts}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return <RootComponent />;
    };
};