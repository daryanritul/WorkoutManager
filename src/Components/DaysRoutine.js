import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {Icon, Text} from 'native-base';

import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {Colors} from '../Constants/Color';

const DaysRoutine = ({day, routineHandler, data, disable, daysType}) => {
  var dd = day - 1;
  var d = dd > 6 ? dd % 7 : dd;
  const weekDays = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THRUSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  // console.log(day - 1, d, weekDays[d]);

  const length = data.exerciseData ? data.exerciseData.length : 0;

  return (
    <View
      style={{
        width: '31%',
        backgroundColor: data.name === 'REST' ? '#fff' : '#F2F2F2',
        margin: 4,
        //     borderWidth: 0.5,
        height: 150,
        elevation: 2,
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={disable}
        onPress={() => routineHandler(data, day)}>
        {daysType ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.primary,
            }}>
            <Text
              style={{
                fontSize: 14,
                width: '50%',
                backgroundColor: Colors.primary,
                textAlign: 'center',
                paddingVertical: 5,
                color: '#fff',
              }}>
              WEEK {Math.trunc((day - 1) / 7 + 1)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                width: '50%',
                backgroundColor: Colors.primary,
                textAlign: 'center',
                paddingVertical: 5,
                color: '#fff',
              }}>
              DAY {day}
            </Text>
          </View>
        ) : (
          <Text
            style={{
              fontSize: 14,
              width: '100%',
              backgroundColor: Colors.primary,
              textAlign: 'center',
              paddingVertical: 5,
              color: '#fff',
            }}>
            {weekDays[d]}
          </Text>
        )}

        {/* <Text
          style={{
            fontSize: 14,
            backgroundColor: Colors.primary,
            textAlign: 'center',
            paddingVertical: 5,
            color: '#fff',
          }}>
          WEEK {Math.trunc((day - 1) / 7 + 1)} | DAY {day}
        </Text> */}
        <View
          style={{
            paddingBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            {data.name}
          </Text>
          {data.name === 'REST' && length === 0 ? (
            <Icon
              name={data.routineStatus ? 'cafe' : 'cafe-outline'}
              style={{
                fontSize: 45,
                textAlign: 'center',
                paddingVertical: 10,
                color: data.routineStatus ? '#29B966' : '#F2F2F2',
              }}
            />
          ) : (
            <Icon
              name={'checkmark-circle'}
              style={{
                fontSize: 45,
                textAlign: 'center',
                paddingVertical: 10,
                color: data.routineStatus ? '#29B966' : '#FFF',
              }}
            />
          )}
          {data.name !== 'REST' && (
            <Text
              note
              style={{
                textAlignVertical: 'bottom',
                textAlign: 'center',
              }}>
              {data.exerciseData ? `${data.exerciseData.length} Exercises` : ''}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DaysRoutine;

const styles = StyleSheet.create({
  weekText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    color: Colors.primary,
  },
});
