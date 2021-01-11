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
        backgroundColor: data.name === 'REST' ? '#fff' : '#F2F2F2',
        margin: 4,
        elevation: 3,
        width: '32%',
        height: 160,
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={disable}
        style={{
          height: '100%',
          width: '100%',
        }}
        onPress={() => routineHandler(data, day)}>
        {daysType ? (
          <View
            style={{
              height: '18%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,

              backgroundColor: Colors.primary,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
              }}>
              WEEK {Math.trunc((day - 1) / 7 + 1)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
              }}>
              DAY {day}
            </Text>
          </View>
        ) : (
          <View
            style={{
              height: '18%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              backgroundColor: Colors.primary,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
              }}>
              {weekDays[d]}
            </Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              height: '30%',
              fontSize: 13,
              paddingHorizontal: 5,
              paddingVertical: 2,
              fontWeight: 'bold',
              textAlign: 'center',
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
                fontSize: 40,
                height: '53%',
                textAlign: 'center',
                textAlignVertical: 'center',

                color: data.routineStatus ? '#29B966' : '#FFF',
              }}
            />
          )}
          {data.name !== 'REST' && (
            <Text
              note
              style={{
                height: '17%',
                textAlignVertical: 'center',
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
