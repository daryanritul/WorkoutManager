import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

import {connect} from 'react-redux';
import {Colors} from '../Constants/Color';

import DisplayWorkout from '../Components/DisplayWorkout';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const WeightsScreen = ({navigation, route, listState}) => {
  const length = listState ? listState.length : 0;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        {length ? (
          <FlatList
            data={listState}
            keyExtractor={(keys) => keys.id}
            renderItem={(itemData) => (
              <DisplayWorkout
                itemData={itemData}
                navigation={navigation}
                routeName={route.name}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
                fontWeight: 'bold',
              }}>
              NO WORKOUTS
            </Text>
            <Text
              note
              style={{
                fontSize: responsiveFontSize(1.5),
              }}>
              (Explore or Create your own workouts)
            </Text>
          </View>
        )}
      </View>
      <Button
        full
        onPress={() => navigation.navigate('AddWorkoutScreen')}
        style={{
          backgroundColor: Colors.primary,
          height: responsiveHeight(5),
        }}>
        <Text
          style={{
            color: Colors.secondary,
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2),
          }}>
          CREATE NEW WORKOUT
        </Text>
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => ({
  listState: state.workout,
});

export default connect(mapStateToProps, null)(WeightsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    margin: 0.5,
    marginBottom: 0,
  },
});
