import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, Image, View} from 'react-native';

import {Text, Icon, Button, Form, Item, Input, Label} from 'native-base';
import {Colors} from '../Constants/Color';
import {connect} from 'react-redux';

import {signInUser, signUpUser} from '../store/actions/auth';

const WelcomeScreen = ({setNavigator}) => {
  return (
    <View style={{flex: 1}}>
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
          <Button style={styles.authButton} onPress={() => setNavigator(1)}>
            <Text style={styles.authText}>SIGN IN</Text>
          </Button>
          <Button style={styles.authButton} onPress={() => setNavigator(2)}>
            <Text style={styles.authText}>SIGN UP</Text>
          </Button>
          <Text style={styles.btnText}>Don't have a Account, Sign-Up</Text>
        </View>
      </View>
    </View>
  );
};

const SignInScreen = ({setNavigator, signInUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
        }}>
        <View
          style={{
            //  backgroundColor: 'rgba(255,255,255,0.8)',
            margin: 20,
            padding: 20,
          }}>
          <Form>
            <Item stackedLabel last style={styles.itemStyle}>
              <Label style={styles.labelStyle}>Email Address</Label>
              <Input
                style={styles.inputStyle}
                value={email}
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
              signInUser(email, password);
            }}>
            <Text style={styles.authText}>SIGN IN</Text>
          </Button>
          <Button
            style={styles.authButton}
            onPress={() => {
              setNavigator(0);
            }}>
            <Text style={styles.authText}>Go Back</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const SignUpScreen = ({setNavigator, signUpUser}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
        }}>
        <View
          style={{
            //  backgroundColor: 'rgba(255,255,255,0.8)',
            margin: 20,
            padding: 20,
          }}>
          <Form>
            <Item stackedLabel last style={styles.itemStyle}>
              <Label style={styles.labelStyle}>Name</Label>
              <Input
                style={styles.inputStyle}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item stackedLabel last style={styles.itemStyle}>
              <Label style={styles.labelStyle}>Email Address</Label>
              <Input
                style={styles.inputStyle}
                value={email}
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
            <Item stackedLabel last style={styles.itemStyle}>
              <Label style={styles.labelStyle}>Confirm Password</Label>
              <Input
                style={styles.inputStyle}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
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
              signUpUser(name, email, password);
            }}>
            <Text style={styles.authText}>SIGN UP</Text>
          </Button>
          <Button
            style={styles.authButton}
            onPress={() => {
              setNavigator(0);
            }}>
            <Text style={styles.authText}>Go Back</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const AuthenticationScreen = ({navigation, route}) => {
  const [navigator, setNavigator] = useState(0);

  return (
    <ImageBackground
      source={require('../Assets/Images/AuthImage.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        {navigator === 0 && <WelcomeScreen setNavigator={setNavigator} />}
        {navigator === 1 && <SignInScreen setNavigator={setNavigator} />}
        {navigator === 2 && <SignUpScreen setNavigator={setNavigator} />}
      </View>
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  signInUser: (email, password) => signInUser(email, password),
  signUpUser: (name, email, password) => signUpUser(name, email, password),
};

export default connect(null, mapDispatchToProps)(AuthenticationScreen);

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
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  btnText: {
    color: Colors.secondary,
    textAlign: 'center',
    fontSize: 12,
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
  },
  inputStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
