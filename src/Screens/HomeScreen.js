import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {Colors} from '../Constants/Color';

import {connect} from 'react-redux';

import {imageArray} from '../Constants/Utility';
import {setUserWorkoutData} from '../store/actions/workout';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const HomeScreen = ({navigation, listState, route, publicState}) => {
  const muscle = [
    'FULL BODY',
    'CHEST',
    'CORE',
    'ARMS',
    'SHOULDER',
    'BACK',
    'LEGS',
  ];

  const activeData = listState.filter(
    (value) =>
      value.workoutStatus.activeStatus === true ||
      (value.workoutStatus.repetition > 0 &&
        value.workoutStatus.finish === true),
  );

  const completed = () => {
    var complete = 0;
    listState.map((value) => {
      complete = complete + value.workoutStatus.repetition;
    });
    return complete;
  };

  const renderActiveData = ({item}) => {
    var imageUrl = imageArray[item.imageUrl];
    const todaysRoutine = item.workoutData.filter(
      (value) => value.routineStatus === false,
    )[0];
    const routineIndex = todaysRoutine
      ? item.workoutData.findIndex((value) => value.id === todaysRoutine.id)
      : '';

    var dd = routineIndex;
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

    return (
      <ImageBackground
        source={imageUrl}
        style={{
          width: responsiveWidth(80),
          height: responsiveHeight(18),
          margin: 5,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
          onPress={() => {
            if (todaysRoutine) {
              navigation.navigate('RoutineScreen', {
                data: todaysRoutine,
                workoutId: item.id,
                day: routineIndex + 1,
                routeName: route.name,
              });
            } else {
              navigation.navigate('WorkoutScreen', {
                data: item,
              });
            }
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 'bold',
                paddingHorizontal: 10,
                textAlign: 'center',
                paddingVertical: 5,
                color: Colors.secondary,
              }}>
              {item.name.toUpperCase()}
            </Text>
            {!todaysRoutine && (
              <Text
                style={{
                  fontSize: responsiveFontSize(2.1),
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Colors.secondary,
                }}>
                WORKOUT COMPLETED
              </Text>
            )}
          </View>
          {todaysRoutine && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),

                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Colors.secondary,
                }}>
                {item.daysType === 'Weekly'
                  ? weekDays[d]
                  : `DAY ${routineIndex + 1}`}{' '}
                - {todaysRoutine.name.toUpperCase()}
              </Text>
            </View>
          )}

          {todaysRoutine && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  padding: 5,
                  fontWeight: 'bold',
                  textAlignVertical: 'center',
                  color: Colors.secondary,
                }}>
                {item.type}
              </Text>
              {todaysRoutine.exerciseData && (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    padding: 5,
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                    color: Colors.secondary,
                  }}>
                  {todaysRoutine.exerciseData.length} Exercises
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  const WorkoutStatus = ({title, number}) => {
    return (
      <View
        style={{
          width: responsiveWidth(30),
        }}>
        <Text
          style={{
            color: Colors.secondary,
            fontWeight: 'bold',
            fontSize: responsiveFontSize(3.5),
            textAlign: 'center',
          }}>
          {number}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.secondary,
            fontSize: responsiveFontSize(1.5),
          }}>
          {title}
        </Text>
      </View>
    );
  };

  const MuscleCard = ({item, index}) => {
    const imageUrl = imageArray[index];
    return (
      <ImageBackground
        source={imageUrl}
        style={{
          marginVertical: 2.5,
          height: responsiveHeight(7.5),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PublicWorkoutScreen', {
              data: publicState.filter(
                (value) => value.workout.muscleGroup.toUpperCase() === item,
              ),
            })
          }
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            paddingHorizontal: 10,
            alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
          }}>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: responsiveFontSize(1.8),
              padding: 10,
              fontWeight: 'bold',
            }}>
            {item} WORKOUTS
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            paddingHorizontal: 5,
            paddingVertical: 4,
            color: Colors.primary,
          }}>
          What's Today
        </Text>
        {activeData.length ? (
          <FlatList
            data={activeData}
            keyExtractor={(value) => value.id}
            renderItem={renderActiveData}
            horizontal={true}
          />
        ) : (
          <View
            style={{
              marginVertical: 2.5,
            }}>
            <ImageBackground
              source={require('../Assets/Images/Image.jpg')}
              s
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(18),
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: Colors.primaryOpacity,
                  justifyContent: 'center',
                }}
                onPress={() => navigation.jumpTo('MyWorkoutsScreen')}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                    textAlign: 'center',
                    paddingVertical: 5,
                    color: Colors.secondary,
                  }}>
                  NO WORKOUT ACTIVE
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                    textAlign: 'center',
                    paddingVertical: 5,
                    color: Colors.secondary,
                  }}>
                  CREATE / EXPLORE
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </View>
      <View
        style={{
          height: responsiveHeight(18),
          width: responsiveWidth(100),
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            paddingHorizontal: 5,
            paddingVertical: 4,
            color: Colors.primary,
          }}>
          My Workouts
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <WorkoutStatus title={'Total\nWorkouts'} number={listState.length} />
          <WorkoutStatus
            title={'Active\nWorkouts'}
            number={
              listState.filter(
                (value) => value.workoutStatus.activeStatus === true,
              ).length
            }
          />
          <WorkoutStatus title={'Workout\nCompleted'} number={completed()} />
        </View>
      </View>
      <Text
        style={{
          fontSize: responsiveFontSize(1.5),
          fontWeight: 'bold',
          paddingHorizontal: 5,
          paddingVertical: 5,
          color: Colors.primary,
        }}>
        Workouts Levels
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: responsiveWidth(33),
            paddingHorizontal: 1.5,
            paddingLeft: 0,
          }}>
          <ImageBackground
            source={require('../Assets/Images/Image15.jpg')}
            style={{
              height: responsiveWidth(15),
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PublicWorkoutScreen', {
                  data: publicState.filter(
                    (value) => value.workout.level === 'Beginner',
                  ),
                })
              }
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.secondary,
                  fontSize: responsiveFontSize(1.5),
                }}>
                BEGINNER
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            width: responsiveWidth(33),
            paddingHorizontal: 1.5,
            paddingLeft: 0,
          }}>
          <ImageBackground
            source={require('../Assets/Images/Image15.jpg')}
            style={{
              height: responsiveWidth(15),
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PublicWorkoutScreen', {
                  data: publicState.filter(
                    (value) => value.workout.level === 'Intermediate',
                  ),
                })
              }
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.secondary,
                  fontSize: responsiveFontSize(1.5),
                }}>
                INTERMEDIATE
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            width: responsiveWidth(33),
            paddingHorizontal: 1.5,
            paddingLeft: 0,
          }}>
          <ImageBackground
            source={require('../Assets/Images/Image15.jpg')}
            style={{
              height: responsiveWidth(15),
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PublicWorkoutScreen', {
                  data: publicState.filter(
                    (value) => value.workout.level === 'Advanced',
                  ),
                })
              }
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.secondary,
                  fontSize: responsiveFontSize(1.5),
                }}>
                ADVANCED
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            paddingHorizontal: 5,
            paddingVertical: 5,
            color: Colors.primary,
          }}>
          Explore Muscle Groups
        </Text>
        <View
          style={{
            flex: 1,
          }}>
          {muscle.map((item, index) => (
            <View key={index} style={{}}>
              <MuscleCard item={item} index={index} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  listState: state.workout,
  publicState: state.publicWorkout,
  authState: state.auth.user,
});

const mapDispatchToProps = {
  setUserWorkoutData: (state, uid) => setUserWorkoutData(state, uid),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    margin: 0.5,
    marginBottom: 0,
  },
});
