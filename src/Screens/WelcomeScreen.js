import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, Image, View} from 'react-native';

import {Text, Icon, Button, Form, Item, Input, Label} from 'native-base';
import {Colors} from '../Constants/Color';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/AuthImage.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/Images/AppLogo.png')}
            style={{
              height: 200,
              width: 270,
            }}
          />
        </View>
        <View style={{flex: 2}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.btnText}>Already have a Account, Sign-In</Text>
            <Button
              style={styles.authButton}
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={styles.authText}>SIGN IN</Text>
            </Button>
            <Button
              style={styles.authButton}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.authText}>SIGN UP</Text>
            </Button>
            <Text style={styles.btnText}>Don't have a Account, Sign-Up</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: '60%',
    margin: 5,
    alignSelf: 'center',
  },
  authText: {
    flex: 1,
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  btnText: {
    color: Colors.secondary,
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'OpenSans-Regular',
  },
  itemStyle: {
    borderTopWidth: 2,
    borderEndWidth: 2,
    borderStartWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  inputStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
