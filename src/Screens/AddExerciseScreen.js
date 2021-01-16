import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Text, Form, Item, Label, Input, Button} from 'native-base';

import {Colors} from '../Constants/Color';
import shortid from 'shortid';

import {connect} from 'react-redux';
import {addRoutine} from '../store/actions/workout';
import propTypes from 'prop-types';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const AddExerciseScreen = ({navigation, route, addRoutine}) => {
  const {data} = route.params;
  const [exerciseData, setExerciseData] = useState([]);
  const [setsData, setSetsData] = useState([]);
  const [name, setName] = useState('');
  const [exName, setExName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [rest, setRest] = useState('60');
  const [setMode, setSetMode] = useState('Single');
  const [addMode, setAddMode] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            addRoutine(
              {
                id: shortid(),
                name: name,
                routineStatus: false,
                exerciseData: exerciseData,
              },
              data.id,
            );
            navigation.navigate('WorkoutScreen');
          }}>
          <Text
            style={{
              padding: 5,
              color: Colors.primary,
              marginHorizontal: 15,
              fontSize: responsiveFontSize(1.8),
              fontWeight: 'bold',
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, exerciseData, name]);

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
            fontSize: responsiveFontSize(1.7),
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
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginVertical: 2,
          elevation: 3,
          backgroundColor: Colors.secondaryLow,
        }}
        onLongPress={() => {
          setExerciseData(
            exerciseData.filter((itemData) => itemData.id !== item.id),
          );
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
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (
      (setMode === 'Super' && setsData.length === 2) ||
      (setMode === 'Gaint' && setsData.length === 3) ||
      (setMode === 'Single' && setsData.length === 1)
    ) {
      setExerciseData([
        ...exerciseData,
        {
          id: shortid(),
          data: setsData,
        },
      ]);
      setSetsData([]);
    }
  }, [setsData]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
      }}>
      <Form>
        <Item inlineLabel last>
          <Label
            style={{
              fontSize: responsiveFontSize(1.5),
              fontWeight: 'bold',
            }}>
            Day Title :
          </Label>
          <Input
            placeholder="E.g., (Chest & Triceps, Shoulder,Back)"
            placeholderTextColor={'#c1c1c1'}
            style={{
              fontSize: responsiveFontSize(1.5),
            }}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Item>
      </Form>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.primary,
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.7),

          padding: 10,
          paddingBottom: 2,
        }}>
        Exercises
      </Text>
      <Text
        note
        style={{
          fontSize: responsiveFontSize(1.5),
          textAlign: 'center',
        }}>
        (Long Press to Delete Exercise from list)
      </Text>
      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        {exerciseData.length ? (
          <FlatList
            data={exerciseData}
            keyExtractor={(value) => value.id}
            renderItem={renderExerciseData}
          />
        ) : (
          //   <Text>ss</Text>
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
              LIST IS EMPTY
            </Text>
            <Text
              note
              style={{
                fontSize: responsiveFontSize(1.5),
              }}>
              (Add new exercise to list)
            </Text>
          </View>
        )}
      </View>
      {!addMode && (
        <Button
          full
          style={{
            backgroundColor: Colors.primary,
          }}
          onPress={() => setAddMode(!addMode)}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.8),
            }}>
            ADD NEW Exercise
          </Text>
        </Button>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addMode}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              elevation: 5,
              marginHorizontal: 10,
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingHorizontal: 10,
              }}>
              <Button
                onPress={() => {
                  setSetMode('Single');
                  setSetsData([]);
                }}
                style={[
                  styles.setButton,
                  {
                    backgroundColor:
                      setMode === 'Single' ? Colors.primary : '#fff',
                  },
                ]}>
                <Text
                  style={[
                    styles.setText,
                    {
                      color: setMode === 'Single' ? '#fff' : Colors.primary,
                      fontWeight: setMode === 'Single' ? 'bold' : 'normal',
                    },
                  ]}>
                  Single Set
                </Text>
              </Button>
              <Button
                onPress={() => {
                  setSetMode('Super');
                  setSetsData([]);
                }}
                style={[
                  styles.setButton,
                  {
                    backgroundColor:
                      setMode === 'Super' ? Colors.primary : '#fff',
                  },
                ]}>
                <Text
                  style={[
                    styles.setText,
                    {
                      color: setMode === 'Super' ? '#fff' : Colors.primary,
                      fontWeight: setMode === 'Super' ? 'bold' : 'normal',
                    },
                  ]}>
                  Super Set
                </Text>
              </Button>
              <Button
                onPress={() => {
                  setSetMode('Gaint');
                  setSetsData([]);
                }}
                style={[
                  styles.setButton,
                  {
                    backgroundColor:
                      setMode === 'Gaint' ? Colors.primary : '#fff',
                  },
                ]}>
                <Text
                  style={[
                    styles.setText,
                    {
                      color: setMode === 'Gaint' ? '#fff' : Colors.primary,
                      fontWeight: setMode === 'Gaint' ? 'bold' : 'normal',
                    },
                  ]}>
                  Gaint Set
                </Text>
              </Button>
            </View>
            <Form>
              <Item
                inlineLabel
                last
                style={{
                  height: responsiveHeight(5),
                }}>
                <Label style={styles.inputStyle}>EXERCISE NAME : </Label>
                <Input
                  value={exName}
                  onChangeText={(text) => setExName(text)}
                  style={styles.inputStyle}
                />
              </Item>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Item
                    inlineLabel
                    style={{
                      height: responsiveHeight(5),

                      width: '40%',
                    }}>
                    <Label style={styles.inputStyle}>SETS : </Label>
                    <Input
                      keyboardType="number-pad"
                      value={sets}
                      style={styles.inputStyle}
                      onChangeText={(text) => setSets(text)}
                    />
                  </Item>
                  <Item
                    inlineLabel
                    style={{
                      height: responsiveHeight(5),

                      width: '45%',
                    }}>
                    <Label style={styles.inputStyle}>REST : </Label>
                    <Input
                      keyboardType="number-pad"
                      value={rest}
                      style={styles.inputStyle}
                      onChangeText={(text) => setRest(text)}
                    />
                  </Item>
                </View>

                <Item
                  inlineLabel
                  style={{
                    height: responsiveHeight(5),
                  }}>
                  <Label style={styles.inputStyle}>REPS : </Label>
                  <Input
                    keyboardType="number-pad"
                    value={reps}
                    style={styles.inputStyle}
                    onChangeText={(text) => setReps(text)}
                  />
                </Item>
              </View>
            </Form>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Button
                style={styles.buttonBox}
                onPress={() => setAddMode(false)}>
                <Text style={styles.buttonText}> Close </Text>
              </Button>
              <Button
                style={styles.buttonBox}
                onPress={() => {
                  if (
                    (setMode === 'Super' && setsData.length < 2) ||
                    (setMode === 'Gaint' && setsData.length < 3) ||
                    (setMode === 'Single' && setsData.length < 1)
                  ) {
                    setSetsData([
                      ...setsData,
                      {
                        id: shortid(),
                        name: exName,
                        reps: reps,
                        sets: sets,
                        rest: rest,
                      },
                    ]);
                  }
                  setExName('');
                }}>
                <Text style={styles.buttonText}>
                  {setMode === 'Super' && setsData.length < 2
                    ? `ADD (${setsData.length + 1}/2)`
                    : setMode === 'Gaint' && setsData.length < 3
                    ? `ADD (${setsData.length + 1}/3)`
                    : 'ADD'}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapDispatchToProps = {
  addRoutine: (data, id) => addRoutine(data, id),
};

AddExerciseScreen.propTypes = {
  addRoutine: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddExerciseScreen);

const styles = StyleSheet.create({
  groupText: {
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
  },
  itemText: {
    padding: 10,
    fontSize: responsiveFontSize(1.5),

    color: '#454545',
  },
  buttonBox: {
    backgroundColor: Colors.primary,
    width: responsiveWidth(35),
    justifyContent: 'center',
    height: 35,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  setButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    height: 30,
    width: '30%',
    justifyContent: 'center',
  },
  setText: {
    fontSize: 12,
    fontSize: responsiveFontSize(1.2),
  },
  inputStyle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(1.6),
  },
});
