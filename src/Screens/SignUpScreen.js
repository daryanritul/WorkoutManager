import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import {Text, Icon, Button, Form, Item, Input, Label} from 'native-base';
import {Colors} from '../Constants/Color';
import {connect} from 'react-redux';

import {signUpUser} from '../store/actions/auth';

import propTypes from 'prop-types';
import {toastMessage} from '../Constants/Utility';

const SignUpScreen = ({signUpUser}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpHandler = async () => {
    if (password !== confirmPassword) {
      toastMessage('Password Not Match');
      setConfirmPassword('');
    } else {
      if (email && name && password && age && height && weight && gender) {
        signUpUser({name, email, password, age, height, weight, gender});
      } else {
        setLoading(false);
        toastMessage('Input Error');
        return;
      }
    }
    setLoading(!loading);
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require('../Assets/Images/AuthImage.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
            }}>
            <View
              style={{
                margin: 10,
                padding: 20,
              }}>
              <Form>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Item
                    stackedLabel
                    last
                    style={[styles.itemStyle, {width: '66%'}]}>
                    <Label style={styles.labelStyle}>Name</Label>
                    <Input
                      style={styles.inputStyle}
                      placeholder="Full Name"
                      value={name}
                      onChangeText={(text) => setName(text)}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.genderBox}
                    onPress={() => setGender('male')}>
                    <Icon
                      name="man"
                      style={[
                        styles.genderIcon,
                        {color: gender === 'male' ? '#196F3D' : Colors.primary},
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.genderBox}
                    onPress={() => setGender('female')}>
                    <Icon
                      name="woman"
                      style={[
                        styles.genderIcon,
                        {
                          color:
                            gender === 'female' ? '#196F3D' : Colors.primary,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Item
                    stackedLabel
                    last
                    style={[styles.itemStyle, {width: '32%'}]}>
                    <Label style={styles.labelStyle}>Age</Label>
                    <Input
                      style={styles.inputStyle}
                      placeholder="00"
                      value={age}
                      keyboardType="number-pad"
                      onChangeText={(text) => setAge(text)}
                    />
                  </Item>
                  <Item
                    stackedLabel
                    last
                    style={[styles.itemStyle, {width: '32%'}]}>
                    <Label style={styles.labelStyle}>Height</Label>
                    <Input
                      style={styles.inputStyle}
                      keyboardType="number-pad"
                      placeholder="000.00 cm"
                      value={height}
                      onChangeText={(text) => setHeight(text)}
                    />
                  </Item>
                  <Item
                    stackedLabel
                    last
                    style={[styles.itemStyle, {width: '32%'}]}>
                    <Label style={styles.labelStyle}>Weight</Label>
                    <Input
                      style={styles.inputStyle}
                      keyboardType="number-pad"
                      placeholder="000.000 kg"
                      value={weight}
                      onChangeText={(text) => setWeight(text)}
                    />
                  </Item>
                </View>
                <Item stackedLabel last style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>Email Address</Label>
                  <Input
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="user@example.com"
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
              <Button style={styles.authButton} onPress={signUpHandler}>
                {loading ? (
                  <ActivityIndicator color={Colors.primary} />
                ) : (
                  <Text style={styles.authText}>SIGN UP</Text>
                )}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  signUpUser: (data) => signUpUser(data),
};

SignUpScreen.propTypes = {
  signUpUser: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUpScreen);

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
  genderBox: {
    width: '15%',
    backgroundColor: 'rgba(255,255,255,0.7)',

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  genderIcon: {
    padding: 6,
    paddingVertical: 8,
    color: Colors.primary,
    // backgroundColor: Colors.secondaryOpacity,
    fontSize: 40,
  },
});
