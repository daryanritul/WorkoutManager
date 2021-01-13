import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Text, Icon, Button, Form, Item, Input, Label} from 'native-base';
import {Colors} from '../Constants/Color';
import {connect} from 'react-redux';

import {signUpUser} from '../store/actions/auth';

import propTypes from 'prop-types';
import {textSize, toastMessage} from '../Constants/Utility';

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
  const [next, setNext] = useState(0);
  const signUpHandler = async () => {
    if (password !== confirmPassword) {
      toastMessage('Password Mismached');
      setConfirmPassword('');
    } else if (!email) {
      setLoading(false);
      toastMessage('ERROR! Email field is empty');
    } else if (!password) {
      setLoading(false);
      toastMessage('ERROR! Password field is empty');
    } else {
      signUpUser({name, email, password, age, height, weight, gender});
    }
    setLoading(!loading);
    Keyboard.dismiss();
  };
  console.log(next);

  return (
    <ImageBackground
      source={require('../Assets/Images/AuthImage.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <View
          style={{
            flex: 2,
            margin: 10,
            justifyContent: 'center',
            padding: 20,
          }}>
          <Form>
            {next === 0 && (
              <View style={{}}>
                <Item stackedLabel last style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>Name</Label>
                  <Input
                    style={styles.inputStyle}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <View
                  style={{
                    paddingVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
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
              </View>
            )}
            {next === 1 && (
              <View style={{}}>
                <Item stackedLabel last style={[styles.itemStyle]}>
                  <Label style={styles.labelStyle}>Age</Label>
                  <Input
                    style={styles.inputStyle}
                    placeholder="00"
                    value={age}
                    keyboardType="number-pad"
                    onChangeText={(text) => setAge(text)}
                  />
                </Item>
                <Item stackedLabel last style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>Height</Label>
                  <Input
                    style={styles.inputStyle}
                    keyboardType="number-pad"
                    placeholder="000.00 cm"
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                  />
                </Item>
                <Item stackedLabel last style={styles.itemStyle}>
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
            )}
            {next === 2 && (
              <View>
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
              </View>
            )}
          </Form>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
          }}>
          {next > 0 && next < 3 && (
            <Button style={styles.authButton} onPress={() => setNext(next - 1)}>
              <Text style={styles.authText}>GO BACK</Text>
            </Button>
          )}
          {next < 2 && (
            <Button
              style={styles.authButton}
              onPress={() => {
                if (next === 0)
                  if (!name) toastMessage('ERROR! Name feild is empty.');
                  else if (!gender) toastMessage('ERROR! Gender not selected.');
                  else setNext(next + 1);

                if (next === 1)
                  if (!age) toastMessage('ERROR! Age field is empty.');
                  else if (!height)
                    toastMessage('ERROR! Height field is empty.');
                  else if (!weight)
                    toastMessage('ERROR! Weight field is empty.');
                  else setNext(next + 1);
              }}>
              <Text style={styles.authText}>NEXT</Text>
            </Button>
          )}
          {next === 2 && (
            <Button style={styles.authButton} onPress={signUpHandler}>
              {loading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <Text style={styles.authText}>SIGN UP</Text>
              )}
            </Button>
          )}
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
    width: '40%',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  authText: {
    flex: 1,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: textSize.btn,
  },
  itemStyle: {
    borderTopWidth: 2,
    borderEndWidth: 2,
    borderStartWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    height: 65,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  labelStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: textSize.label,
  },
  inputStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: textSize.label,
  },
  genderBox: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 65,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  genderIcon: {
    color: Colors.primary,
    // backgroundColor: Colors.secondaryOpacity,
    fontSize: 40,
  },
});
