import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Switch,
  Modal,
} from 'react-native';

import {Icon, Text, Button} from 'native-base';
import {Colors} from '../Constants/Color';
import shortid from 'shortid';

import DaysRoutine from '../Components/DaysRoutine';
import {
  addRoutine,
  workoutActiveStatus,
  resetWorkout,
  repetitionStatus,
  shareWorkout,
  addWorkout,
} from '../store/actions/workout';
import {connect} from 'react-redux';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import propTypes from 'prop-types';
import {imageArray, toastMessage} from '../Constants/Utility';

const WorkoutScreen = ({
  navigation,
  listState,
  authState,
  shareWorkout,
  route,
  addRoutine,
  workoutActiveStatus,
  resetWorkout,
  repetitionStatus,
  addWorkout,
}) => {
  const {data, routeName} = route.params;
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState(false);
  const dataState =
    routeName === 'MyWorkoutsScreen'
      ? listState.filter((item) => item.id === data.id)[0]
      : data;
  const workout = dataState.workoutData;
  const dataid = routeName === 'MyWorkoutsScreen' ? data.id : data;
  const toggleSwitch = () => repetitionStatus(dataState.id);
  useLayoutEffect(() => {
    if (routeName === 'MyWorkoutsScreen')
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => {
              setModal(!modal);
            }}>
            <Icon
              name={'ellipsis-vertical'}
              style={{
                color: Colors.secondary,
                padding: 5,
                fontSize: responsiveFontSize(3),
              }}
            />
          </TouchableOpacity>
        ),
      });
  }, [navigation, modal]);

  const validateAddWorkout = (id) => {
    var status = listState.filter((value) => value.id === id).length;

    if (status) return true;
    else return false;
  };

  const routineHandler = (data, day) => {
    navigation.navigate('RoutineScreen', {
      data: data,
      workoutId: dataid,
      day: day,
      routeName,
    });
  };

  useEffect(() => {
    if (!dataState.workoutData) {
      setEditMode(true);
    }
  }, []);

  const startWorkoutHandler = () => {
    workoutActiveStatus(data.id, true), toastMessage('Workout Started');
  };

  const fin = dataState.workoutStatus.finish;
  const stat = dataState.workoutStatus.repetitionStatus;
  useEffect(() => {
    if (stat && fin) {
      resetWorkout(dataid, false), startWorkoutHandler();
    }
  }, [fin, stat]);

  var imageUrl = imageArray[data.imageUrl];
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageUrl}
        style={{
          width: '100%',
          height: responsiveHeight(20),
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
            {data.name.toUpperCase()}
          </Text>
        </View>
        {dataState.workoutStatus.activeStatus && !editMode && (
          <View
            style={{
              backgroundColor: Colors.primaryOpacity,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.secondary,
                  fontWeight: 'bold',
                }}>
                0%
              </Text>
              <Text
                style={{
                  color: Colors.secondary,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.5),
                }}>
                {dataState.workoutData.length ===
                dataState.workoutStatus.routineTracker
                  ? 'Workout Completed'
                  : `${
                      dataState.workoutData.length -
                      dataState.workoutStatus.routineTracker
                    } Days Left `}
              </Text>
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: 'bold',
                }}>
                100%
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: responsiveHeight(0.5),
                  backgroundColor: 'yellow',
                  width: `${
                    (100 / dataState.workoutData.length) *
                    dataState.workoutStatus.routineTracker
                  }%`,
                }}></View>
            </View>
          </View>
        )}
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            paddingVertical: 8,
            paddingHorizontal: 10,
            color: Colors.primary,
          }}>
          Workouts
        </Text>
        {routeName === 'MyWorkoutsScreen' && (
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
              fontWeight: 'bold',
              paddingHorizontal: 10,
              paddingVertical: 8,
              color: Colors.primary,
            }}>
            Finished {dataState.workoutStatus.repetition} Times
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        {workout ? (
          <FlatList
            data={workout}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <DaysRoutine
                day={index + 1}
                data={item}
                routineHandler={routineHandler}
                disable={editMode}
                daysType={data.daysType === 'Days' ? true : false}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
              }}>
              WORKOUT IS EMPTY
            </Text>
            <Text
              note
              style={{
                fontSize: responsiveFontSize(1.5),
              }}>
              Add Rest/Working Days To This Workout
            </Text>
          </View>
        )}
      </View>
      {routeName === 'MyWorkoutsScreen' ? (
        <View>
          {editMode ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                full
                style={{
                  width: '42.5%',
                  backgroundColor: Colors.primary,
                }}
                onPress={async () => {
                  toastMessage('Rest Day Added');
                  await addRoutine(
                    {
                      id: shortid(),
                      name: 'REST',
                      routineStatus: false,
                      exerciseData: [],
                    },
                    data.id,
                  );
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Add Rest Day
                </Text>
              </Button>

              <Button
                full
                style={{
                  width: '42.5%',
                  backgroundColor: Colors.primary,
                }}
                onPress={() =>
                  navigation.navigate('AddExerciseScreen', {
                    data: data,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Add Workout Day
                </Text>
              </Button>
              <Button
                style={{
                  width: '14%',
                  backgroundColor: Colors.primary,
                }}
                onPress={() => {
                  setEditMode(false);
                }}>
                <Icon
                  name="checkmark-sharp"
                  style={{
                    fontSize: responsiveFontSize(3),
                  }}
                />
              </Button>
            </View>
          ) : (
            dataState.workoutData && (
              <Button
                full
                disabled={
                  dataState.workoutStatus.activeStatus
                    ? true
                    : dataState.workoutStatus.finish
                    ? true
                    : false
                }
                onPress={() => startWorkoutHandler()}
                style={{
                  backgroundColor: Colors.primary,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2.1),
                  }}>
                  {dataState.workoutStatus.activeStatus
                    ? 'workout in progress'
                    : dataState.workoutStatus.finish
                    ? 'Workout Finished'
                    : 'Start Workout'}
                </Text>
              </Button>
            )
          )}
        </View>
      ) : (
        <Button
          full
          disabled={validateAddWorkout(dataState.id)}
          onPress={async () => {
            await addWorkout(dataState);

            toastMessage('Workout Added');
          }}
          style={{
            backgroundColor: Colors.primary,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.1),
            }}>
            {validateAddWorkout(dataState.id) ? 'ADDED' : 'ADD TO MY WORKOUTS'}
          </Text>
        </Button>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              width: responsiveWidth(70),
              backgroundColor: Colors.secondary,
              padding: 15,
              borderRadius: 5,
              elevation: 5,
              paddingTop: 8,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 'bold',
                paddingHorizontal: 15,
                textAlign: 'center',
                paddingVertical: 8,
                color: Colors.primary,
              }}>
              WORKOUT OPTIONS
            </Text>
            <Button
              full
              style={styles.modalButton}
              onPress={() => {
                setEditMode(true), setModal(false);
              }}>
              <Text style={styles.modalBtnText}>ADD MORE DAYS</Text>
            </Button>

            <Button
              full
              style={styles.modalButton}
              onPress={() => {
                resetWorkout(dataid, true), setModal(false);
              }}>
              <Text style={styles.modalBtnText}>Reset All</Text>
            </Button>
            <Button
              full
              disabled={dataState.workoutStatus.shared}
              style={styles.modalButton}
              onPress={() => {
                shareWorkout(dataState, dataState.id, authState.name),
                  setModal(false);
              }}>
              <Text style={styles.modalBtnText}>
                {dataState.workoutStatus.shared ? 'SHARED' : 'SHARE'}
              </Text>
            </Button>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: Colors.primary,
                paddingVertical: 8,

                marginHorizontal: 3,
                marginVertical: 1.5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),

                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  color: Colors.secondary,
                }}>
                WORKOUT REPETITION
              </Text>
              <Switch
                trackColor={{
                  false: Colors.secondaryLow,
                  true: Colors.secondary,
                }}
                style={{
                  marginHorizontal: 5,
                }}
                thumbColor={
                  dataState.workoutStatus.repetitionStatus ? '#29B966' : 'red'
                }
                onValueChange={toggleSwitch}
                value={dataState.workoutStatus.repetitionStatus}
              />
            </View>
            <Button
              full
              style={styles.modalButton}
              onPress={() => setModal(!modal)}>
              <Text style={styles.modalBtnText}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapDispatchToProps = {
  addRoutine: (data, id) => addRoutine(data, id),
  workoutActiveStatus: (id, status) => workoutActiveStatus(id, status),
  resetWorkout: (id, mode) => resetWorkout(id, mode),
  repetitionStatus: (id) => repetitionStatus(id),
  shareWorkout: (workout, uid, name) => shareWorkout(workout, uid, name),
  addWorkout: (workout) => addWorkout(workout),
};

const mapStateToProps = (state) => ({
  listState: state.workout,
  authState: state.auth.user,
  publicState: state.publicWorkout,
});

WorkoutScreen.propTypes = {
  addRoutine: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  radioButton: {
    fontSize: responsiveFontSize(1.5),

    color: Colors.primary,
  },
  modalBtnText: {
    color: Colors.secondary,
    fontSize: responsiveFontSize(1.5),
  },
  modalButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 3,
    marginVertical: 1.5,
    borderRadius: 5,
  },
});
