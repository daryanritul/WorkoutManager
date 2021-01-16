import {Button, Icon, Text} from 'native-base';
import React, {useEffect} from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {Colors} from '../Constants/Color';

import {
  workoutActiveStatus,
  markAsDone,
  updateRoutineTracker,
  markAsFinish,
} from '../store/actions/workout';
import {connect} from 'react-redux';

import {imageArray, toastMessage} from '../Constants/Utility';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const RoutineScreen = ({
  route,
  navigation,
  markAsDone,
  listState,
  updateRoutineTracker,
  workoutActiveStatus,
  markAsFinish,
}) => {
  const {data, workoutId, day, routeName} = route.params;
  const dataState =
    routeName === 'MyWorkoutsScreen' || routeName === 'HomeScreen'
      ? listState.filter((item) => item.id === workoutId)[0]
      : workoutId;

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

  var routine = dataState.workoutStatus.routineTracker;

  useEffect(() => {
    if (
      dataState.workoutStatus.routineTracker === dataState.workoutData.length
    ) {
      markAsFinish(dataState.id);
      workoutActiveStatus(dataState.id, false);
    }
  }, [routine]);

  const markAsDoneValidator = () => {
    const index = dataState.workoutData.findIndex(
      (value) => value.id === data.id,
    );
    if (index === 0) return true;
    else {
      if (dataState.workoutData[index - 1].routineStatus === true) return true;
      else return false;
    }
  };

  const DisplayExercise = ({name, sets, reps, rest}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondaryLow,
          marginHorizontal: 5,
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            color: Colors.primary,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
            }}>
            Sets : {sets}
          </Text>

          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
            }}>
            Rest : {rest} Sec
          </Text>
        </View>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
          }}>
          Reps : {reps}
        </Text>
      </View>
    );
  };

  const renderExerciseData = ({item, index}) => {
    var set = index + 1;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          elevation: 3,
          backgroundColor: Colors.secondaryLow,
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            fontWeight: 'bold',
            width: '15%',
            backgroundColor: Colors.primary,
            textAlign: 'center',
            color: Colors.secondary,
            textAlignVertical: 'center',
          }}>
          {set}
        </Text>
        <View
          style={{
            flex: 1,
          }}>
          {item.data.map((value, index) => (
            <View
              key={value.id}
              style={{
                borderBottomWidth:
                  item.data.length > 1 && index < item.data.length - 1
                    ? 0.5
                    : 0,
                marginHorizontal: 10,
              }}>
              <DisplayExercise
                name={value.name}
                index={`${set}.${index + 1}`}
                sets={value.sets}
                reps={value.reps}
                rest={value.rest}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };
  var imageUrl = imageArray[dataState.imageUrl];

  const length = data.exerciseData ? data.exerciseData.length : 0;

  return (
    <View style={{flex: 1, backgroundColor: Colors.secondary}}>
      <ImageBackground
        source={imageUrl}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(15),
          marginVertical: 3,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryOpacity,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: responsiveFontSize(2.1),
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {dataState.daysType === 'Weekly' ? weekDays[d] : ` DAY : ${day}`} -{' '}
            {data.name.toUpperCase()}
          </Text>
        </View>
      </ImageBackground>
      <Text
        style={{
          fontSize: responsiveFontSize(1.5),
          fontWeight: 'bold',
          paddingHorizontal: 15,
          paddingVertical: 5,
          color: Colors.primary,
        }}>
        Exercise
      </Text>
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: 'center',
          backgroundColor: Colors.secondary,
        }}>
        {data.name === 'REST' && length === 0 ? (
          <Icon
            name="cafe"
            style={{
              textAlign: 'center',
              fontSize: 70,
              color: '#29B966',
            }}
          />
        ) : (
          <FlatList
            data={data.exerciseData}
            keyExtractor={(value) => value.id}
            renderItem={renderExerciseData}
          />
        )}
      </View>
      {dataState.workoutStatus.activeStatus && (
        <Button
          full
          disabled={data.routineStatus}
          onPress={async () => {
            if (markAsDoneValidator()) {
              await updateRoutineTracker(workoutId);
              await markAsDone(true, workoutId, data.id);

              navigation.goBack();
            } else {
              toastMessage('Previous Workout Unfinished');
            }
          }}
          style={{
            backgroundColor: Colors.primary,
            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
            }}>
            {data.routineStatus ? 'COMPLETED' : 'MARK AS DONE'}
          </Text>
        </Button>
      )}
    </View>
  );
};

const mapDispatchToProps = {
  markAsDone: (status, id1, id2) => markAsDone(status, id1, id2),
  updateRoutineTracker: (id) => updateRoutineTracker(id),
  markAsFinish: (id) => markAsFinish(id),
  workoutActiveStatus: (id, status) => workoutActiveStatus(id, status),
};

const mapStateToProps = (state) => ({
  listState: state.workout,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);

const styles = StyleSheet.create({});
