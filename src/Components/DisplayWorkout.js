import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button, Icon, Fab, Card, CardItem, Header, Item} from 'native-base';

import {Colors} from '../Constants/Color';
import {imageArray} from '../Constants/Utility';
import {removeWorkout} from '../store/actions/workout';
import {connect} from 'react-redux';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const DisplayWorkout = ({itemData, navigation, removeWorkout, routeName}) => {
  var imageUrl = imageArray[itemData.item.imageUrl];
  return (
    <ImageBackground
      source={imageUrl}
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(18),
        marginVertical: 3,
      }}
      imageStyle={{}}>
      <View
        style={{
          backgroundColor: Colors.primaryOpacity,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            padding: 1,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
              color: Colors.secondary,
              fontWeight: 'bold',
            }}>
            {itemData.item.level}
          </Text>
          <Text
            style={{
              color: Colors.secondary,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.5),
            }}>
            {itemData.item.target}
          </Text>
          <Text
            style={{
              color: Colors.secondary,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.5),
            }}>
            {itemData.item.type}
          </Text>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: responsiveFontSize(1.5),
              fontWeight: 'bold',
            }}>
            {itemData.item.workoutData ? itemData.item.workoutData.length : '0'}{' '}
            Days
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('WorkoutScreen', {
            data: itemData.item,
            routeName,
          });
        }}
        onLongPress={() => {
          Alert.alert(
            'Warning',
            `Are you sure want to delete '${itemData.item.name}' from workouts`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Delete', onPress: () => removeWorkout(itemData.item.id)},
            ],
            {cancelable: true},
          );
        }}
        style={{
          flex: 1,
          backgroundColor: Colors.primaryOpacity,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: responsiveFontSize(2.1),
              padding: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {itemData.item.name.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
      {itemData.item.workoutStatus.activeStatus && (
        <View
          style={{
            backgroundColor: Colors.primaryOpacity,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              padding: 1,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: Colors.secondary,
                fontWeight: 'bold',
              }}>
              {Math.trunc(
                (100 / itemData.item.workoutData.length) *
                  itemData.item.workoutStatus.routineTracker,
              )}
              % Completed
            </Text>
            <Text
              style={{
                color: Colors.secondary,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),
              }}>
              {`${
                itemData.item.workoutData.length -
                itemData.item.workoutStatus.routineTracker
              } Days Left `}
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  removeWorkout: (id) => removeWorkout(id),
};

export default connect(null, mapDispatchToProps)(DisplayWorkout);

const styles = StyleSheet.create({});
