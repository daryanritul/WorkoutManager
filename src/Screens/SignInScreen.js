import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';

import {Text, Icon, Button, Form, Item, Input, Label} from 'native-base';
import {Colors} from '../Constants/Color';
import {connect} from 'react-redux';
import {signInUser} from '../store/actions/auth';
import {toastMessage} from '../Constants/Utility';
const SignInScreen = ({signInUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={require('../Assets/Images/AuthImage.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
            }}>
            <View
              style={{
                margin: 20,
                padding: 20,
              }}>
              <Form>
                <Item stackedLabel last style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>Email Address</Label>
                  <Input
                    style={styles.inputStyle}
                    placeholder="user@example.com"
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item stackedLabel last style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>Password</Label>
                  <Input
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
              </Form>
            </View>
          </View>
          <View style={{flex: 2}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Button
                style={styles.authButton}
                onPress={() => {
                  if (email && password) signInUser({email, password});
                  else toastMessage('Enter Email & Password');
                  setLoading(!loading);
                  Keyboard.dismiss();
                }}>
                {loading ? (
                  <ActivityIndicator color={Colors.primary} />
                ) : (
                  <Text style={styles.authText}>SIGN IN</Text>
                )}
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  signInUser: (data) => signInUser(data),
};

export default connect(null, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: '60%',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  authText: {
    flex: 1,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
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
  labelStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  inputStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
