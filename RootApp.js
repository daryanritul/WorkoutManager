import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import {Provider, useDispatch} from 'react-redux';
import store from './src/store/store';

import {Colors} from './src/Constants/Color';

import App from './App';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
      <StatusBar backgroundColor={Colors.secondary} barStyle="dark-content" />
    </Provider>
  );
};

export default RootApp;
