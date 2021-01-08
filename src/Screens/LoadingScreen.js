import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Text} from 'native-base';
import {Colors} from '../Constants/Color';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
      }}>
      <ActivityIndicator color={Colors.primary} size="large" style={{}} />
      <Text
        note
        style={{
          padding: 10,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;
