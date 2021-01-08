import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Constants/Color';

const DisplayExercise = ({index, name, sets, reps, rest}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        elevation: 3,
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        height: 75,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingVertical: 13,
        }}>
        <View
          style={{
            width: '65%',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              fontSize: 23,
              color: Colors.secondary,
              fontWeight: 'bold',
            }}>
            {index}. {name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: '35%',
            justifyContent: 'center',
            borderLeftWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: Colors.secondary,
          }}>
          <Text note>SETS : {sets}</Text>
          <Text note>REPS : {reps}</Text>
          <Text note>REST : {rest} Sec</Text>
        </View>
      </View>
    </View>
  );
};

export default DisplayExercise;

const styles = StyleSheet.create({});
