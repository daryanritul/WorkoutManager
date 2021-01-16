import React, {useState, useLayoutEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  TextInput,
} from 'react-native';
import {Colors} from '../Constants/Color';
import {Icon, Input, Picker} from 'native-base';

import {Button} from 'native-base';
import {toastMessage} from '../Constants/Utility';
import {signOutUser, updateUserData} from '../store/actions/auth';
import {connect} from 'react-redux';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const ProfileListCard = ({keys, value, mode, setValue}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomWidth: 0.2,
        margin: 5,
      }}>
      <Text
        style={{
          width: '40%',
          textAlign: 'center',
          padding: 10,
          fontSize: responsiveFontSize(1.7),
          fontWeight: 'bold',
        }}>
        {keys}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          padding: 10,
          fontSize: responsiveFontSize(1.7),

          fontWeight: 'bold',
        }}>
        :
      </Text>
      {!mode ? (
        <Text
          style={{
            fontSize: responsiveFontSize(1.7),

            width: '60%',
            padding: 10,
            textAlign: 'left',
          }}>
          {value}
          {keys === 'Height' && ' Cm'}
          {keys === 'Weight' && ' Kg'}
        </Text>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          {keys === 'Fitness Level' ? (
            <Picker
              note
              mode="dropdown"
              selectedValue={value}
              onValueChange={(value) => setValue(value)}
              style={{
                width: 200,
                fontSize: responsiveFontSize(1.7),
              }}>
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
          ) : (
            <TextInput
              placeholder={keys}
              value={value}
              onChangeText={(text) => setValue(text)}
              keyboardType="number-pad"
              style={{
                fontSize: responsiveFontSize(1.7),

                padding: 5,
                textAlign: 'left',
                borderBottomWidth: 0.4,
                borderColor: 'green',
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const ProfileScreen = ({
  navigation,
  route,
  signOutUser,
  userState,
  updateUserData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [age, setAge] = useState(userState.age ? userState.age : '');
  const [height, setHeight] = useState(
    userState.height ? userState.height : '',
  );
  const [weight, setWeight] = useState(
    userState.weight ? userState.weight : '',
  );
  const [fitLevel, setFitLevel] = useState(
    userState.level ? userState.level : '',
  );

  useLayoutEffect(() => {
    if (!editMode)
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => {
              setEditMode(!editMode);
            }}>
            <Icon
              name={'create'}
              style={{
                color: Colors.secondary,
                padding: 5,
                fontSize: responsiveFontSize(3),
              }}
            />
          </TouchableOpacity>
        ),
      });
  }, [navigation, editMode]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/Images/Image15.jpg')}
        style={{
          width: '100%',
          height: responsiveHeight(25),
          elevation: 5,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryOpacity,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: responsiveHeight(12),
              width: responsiveHeight(12),
              borderWidth: 3,
              borderColor: Colors.secondary,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Colors.secondary,
                fontSize: responsiveFontSize(5),
                fontWeight: 'bold',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}>
              {userState.name.charAt(0)}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.5),
              padding: 12,
              color: Colors.secondary,
              textAlignVertical: 'bottom',
            }}>
            {userState.name.toUpperCase()}
          </Text>
        </View>
      </ImageBackground>

      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.7),
              fontWeight: 'bold',
              paddingHorizontal: 10,
              paddingVertical: 10,
              color: Colors.primary,
            }}>
            Personal Details
          </Text>

          <ProfileListCard
            keys="Age"
            value={age}
            mode={editMode}
            setValue={setAge}
          />
          <ProfileListCard
            keys="Gender"
            value={userState.gender.toUpperCase()}
            mode={false}
          />
          <ProfileListCard
            keys="Height"
            value={height}
            mode={editMode}
            setValue={setHeight}
          />
          <ProfileListCard
            keys="Weight"
            value={weight}
            mode={editMode}
            setValue={setWeight}
          />
          <ProfileListCard
            keys="Fitness Level"
            value={fitLevel}
            mode={editMode}
            setValue={setFitLevel}
          />
        </ScrollView>

        <Button
          full
          style={{
            backgroundColor: editMode ? '#1FAA59' : '#B4161B',
          }}
          onPress={() => {
            if (editMode) {
              setEditMode(!editMode);
              updateUserData({
                uid: userState.uid,
                age,
                height,
                weight,
                level: fitLevel,
              });
              toastMessage('Details Saved');
            } else {
              Alert.alert(
                'Warning',
                'Are you sure want to Sign-Out',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'Sign-Out', onPress: () => signOutUser()},
                ],
                {cancelable: false},
              );
            }
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.1),

              padding: 12,
              textAlign: 'center',
              width: '90%',
              color: Colors.secondary,
            }}>
            {editMode ? 'SAVE' : 'SIGN OUT'}
          </Text>
          <Icon
            name={!editMode ? 'power-sharp' : 'checkmark-done-sharp'}
            style={{
              color: Colors.secondary,
              width: '10%',
              fontSize: responsiveFontSize(3),
            }}
          />
        </Button>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  signOutUser: () => signOutUser(),
  updateUserData: (data) => updateUserData(data),
};

const mapStateToProps = (state) => ({
  userState: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});
