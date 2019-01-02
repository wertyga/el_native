import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from "common";

import { AppNavigator } from "../navigation";

const store = configureStore();
export class RootComponent extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <AppNavigator />
            </Provider>
        );
    };
};