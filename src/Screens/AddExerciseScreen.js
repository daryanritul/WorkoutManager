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
  console.log(data.id);

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
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, exerciseData, name]);

  const renderExerciseData = ({item, index}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          setExerciseData(
            exerciseData.filter((itemData) => itemData.id !== item.id),
            console.log('i am pressed'),
          );
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: 3,
            marginLeft: 10,
            marginVertical: 5,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#454545',
              }}>
              {index + 1}.{' '}
              {item.data.length === 1
                ? `${item.data[0].name}`
                : item.data.length === 2
                ? 'Super Set'
                : item.data.length === 3
                ? 'Gaint Set'
                : ''}
            </Text>
          </View>

          {item.data.map((value, index) => (
            <View
              key={value.id}
              style={{
                marginHorizontal: 20,
              }}>
              {item.data.length > 1 ? (
                <Text
                  style={{
                    fontSize: 15,
                    padding: 2,
                  }}>
                  {item.data.length > 1 ? `${index + 1}.` : ''} {value.name}
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 2,
                  paddingHorizontal: 20,
                }}>
                <Text note>
                  SETS : {value.sets} X {value.reps}
                </Text>
                <Text note> REST : {value.rest}s</Text>
              </View>
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
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Day Title :
          </Label>
          <Input
            placeholder="E.g., (Chest & Triceps, Shoulder,Back)"
            placeholderTextColor={'#c1c1c1'}
            style={{
              fontSize: 14,
            }}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Item>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.primary,
            fontWeight: 'bold',
            fontSize: 20,
            padding: 10,
            paddingBottom: 2,
          }}>
          Exercise List
        </Text>
      </Form>
      <View
        style={{
          flex: 1,
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
                fontSize: 20,

                fontWeight: 'bold',
              }}>
              LIST IS EMPTY
            </Text>
            <Text
              note
              style={{
                fontSize: 15,

                fontWeight: 'bold',
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
              fontSize: 18,
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
                  height: 40,
                }}>
                <Label>EXERCISE NAME : </Label>
                <Input
                  value={exName}
                  onChangeText={(text) => setExName(text)}
                  style={{
                    //                    backgroundColor: Colors.secondaryLow,
                    fontWeight: 'bold',
                  }}
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
                      height: 40,
                      width: '40%',
                    }}>
                    <Label>SETS : </Label>
                    <Input
                      keyboardType="number-pad"
                      value={sets}
                      onChangeText={(text) => setSets(text)}
                    />
                  </Item>
                  <Item
                    inlineLabel
                    style={{
                      height: 40,
                      width: '45%',
                    }}>
                    <Label>REST : </Label>
                    <Input
                      keyboardType="number-pad"
                      value={rest}
                      onChangeText={(text) => setRest(text)}
                    />
                  </Item>
                </View>

                <Item
                  inlineLabel
                  style={{
                    height: 40,
                  }}>
                  <Label>REPS : </Label>
                  <Input
                    keyboardType="number-pad"
                    value={reps}
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
    fontSize: 15,
    color: '#454545',
  },
  buttonBox: {
    backgroundColor: Colors.primary,
    width: '35%',
    justifyContent: 'center',
    height: 35,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
});
