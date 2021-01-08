import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import {Button, Form, Item, Input, Label, Icon} from 'native-base';
import {connect} from 'react-redux';
import shortid from 'shortid';
import {Colors} from '../Constants/Color';
import {updateUserData} from '../store/actions/auth';
import {toastMessage} from '../Constants/Utility';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StaticsCard = ({value, index, editMode, deleteHandler}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 2.5,
        backgroundColor: Colors.primaryLow,
        borderRadius: 5,
      }}>
      <View
        style={{
          width: '15%',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 1,
          marginVertical: 5,
          borderColor: Colors.secondary,
        }}>
        {editMode ? (
          <TouchableOpacity onPress={() => deleteHandler(value.id)}>
            <Icon
              name="trash"
              style={{
                color: Colors.secondary,
                padding: 6,
                fontSize: 25,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              color: Colors.secondary,
              padding: 5,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            {index + 1}
          </Text>
        )}
      </View>
      <View
        style={{
          width: '85%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '33.33%',
            borderRightWidth: 1,
            marginVertical: 5,
            borderColor: Colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.statText}>{value.date}</Text>
        </View>
        <View
          style={{
            width: '33.33%',
            borderRightWidth: 1,
            marginVertical: 5,
            borderColor: Colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.statText}>{value.weight} kg</Text>
        </View>
        <View
          style={{
            width: '33.33%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.statText}>{value.height} cm</Text>
        </View>
      </View>
    </View>
  );
};

const FitnessStatics = ({updateUserData, userState, navigation}) => {
  const [modal, setModal] = useState(false);
  const [weight, setWeight] = useState();
  const [date, setDate] = useState();
  const [dayMode, setDayMode] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const bodyStat = userState.bodyStat ? userState.bodyStat : [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setEditMode(!editMode)}
          style={{
            marginHorizontal: 10,
          }}
          onPress={() => {
            setEditMode(!editMode);
          }}>
          <Icon
            name={!editMode ? 'ellipsis-vertical' : 'checkmark-sharp'}
            style={{
              color: Colors.secondary,
              padding: 5,
              fontSize: 24,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, editMode]);

  const calculateHandler = () => {
    const statData = {
      id: shortid(),
      date: dayMode
        ? new Date().getDate() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getFullYear()
        : date,
      weight,
      age: userState.age,
      height: userState.height,
    };
    updateUserData({
      bodyStat: userState.bodyStat
        ? [...userState.bodyStat, statData]
        : [statData],
      uid: userState.uid,
    });
    setDate('');
    setWeight('');
    toastMessage('Added');
  };

  const deleteHandler = (id) => {
    updateUserData({
      bodyStat: userState.bodyStat.filter((value) => value.id !== id),
      uid: userState.uid,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
      }}>
      <ImageBackground
        source={require('../Assets/Images/Stats.jpg')}
        style={{
          width: '100%',
          height: 180,
          elevation: 5,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryOpacity,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 23,
              padding: 12,
              color: Colors.secondary,
            }}>
            BODY FITNESS STATISTICS
          </Text>
        </View>
      </ImageBackground>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingHorizontal: 5,
          paddingVertical: 4,
          color: Colors.primary,
        }}>
        Statistics
      </Text>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 5,
            marginVertical: 2.5,
            backgroundColor: Colors.primaryLow,
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              marginVertical: 5,
              borderColor: Colors.secondary,
            }}>
            <Text
              style={{
                color: Colors.secondary,
                padding: 5,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              S.No
            </Text>
          </View>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '33.33%',
                borderRightWidth: 1,
                marginVertical: 5,
                borderColor: Colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.statText}>DATE</Text>
            </View>
            <View
              style={{
                width: '33.33%',
                borderRightWidth: 1,
                marginVertical: 5,
                borderColor: Colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.statText}>WEIGHT</Text>
            </View>
            <View
              style={{
                width: '33.33%',

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.statText}>HEIGHT</Text>
            </View>
          </View>
        </View>
        {bodyStat.length ? (
          <View style={{}}>
            {bodyStat.map((value, index) => (
              <View key={value.id}>
                <StaticsCard
                  value={value}
                  index={index}
                  editMode={editMode}
                  deleteHandler={deleteHandler}
                />
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="sad-outline"
              style={{
                fontSize: 50,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              OOPS...!
            </Text>
            <Text>NO RECORD YET</Text>
          </View>
        )}
      </ScrollView>
      <Button
        full
        onPress={() => setModal(!modal)}
        style={{
          backgroundColor: Colors.primary,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            padding: 12,
            color: Colors.secondary,
          }}>
          ADD
        </Text>
      </Button>
      <Modal
        animationType="slide"
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
          }}>
          <View
            style={{
              elevation: 8,
              backgroundColor: Colors.secondary,
              width: '80%',
              padding: 10,
            }}>
            <Form>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                  paddingHorizontal: 10,
                }}>
                <Button
                  onPress={() => {
                    setDayMode(!dayMode);
                  }}
                  style={[
                    styles.setButton,
                    {
                      backgroundColor: dayMode ? Colors.primary : '#fff',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.setText,
                      {
                        color: dayMode ? '#fff' : Colors.primary,
                        fontWeight: dayMode ? 'bold' : 'normal',
                      },
                    ]}>
                    TODAY DATE
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setDayMode(!dayMode);
                  }}
                  style={[
                    styles.setButton,
                    {
                      backgroundColor: !dayMode ? Colors.primary : '#fff',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.setText,
                      {
                        color: !dayMode ? '#fff' : Colors.primary,
                        fontWeight: !dayMode ? 'bold' : 'normal',
                      },
                    ]}>
                    CUSTOM DATE
                  </Text>
                </Button>
              </View>
              {!dayMode && (
                <Item stackedLabel>
                  <Label
                    style={{
                      color: Colors.primary,
                      fontWeight: 'bold',
                    }}>
                    DATE
                  </Label>
                  <Input
                    style={{color: Colors.primary, fontWeight: 'bold'}}
                    keyboardType="number-pad"
                    placeholder="dd-mm-yy"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                  />
                </Item>
              )}
              <Item stackedLabel>
                <Label
                  style={{
                    color: Colors.primary,
                    fontWeight: 'bold',
                  }}>
                  WEIGHT
                </Label>
                <Input
                  style={{color: Colors.primary, fontWeight: 'bold'}}
                  keyboardType="number-pad"
                  placeholder="00.00 kg"
                  value={weight}
                  onChangeText={(text) => setWeight(text)}
                />
              </Item>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  block
                  style={{
                    backgroundColor: Colors.primary,
                    width: '48%',
                  }}
                  onPress={() => {
                    if (weight) {
                      calculateHandler();
                      setModal(false);
                    } else {
                      toastMessage('Wrong Input');
                    }
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      padding: 12,
                      color: Colors.secondary,
                    }}>
                    ADD
                  </Text>
                </Button>
                <Button
                  block
                  style={{
                    backgroundColor: Colors.primary,
                    width: '48%',
                  }}
                  onPress={() => {
                    setModal(false);
                    setDate('');
                    setWeight('');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      padding: 12,
                      color: Colors.secondary,
                    }}>
                    CLOSE
                  </Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userState: state.auth.user,
});

const mapDispatchToProps = {
  updateUserData: (data, uid) => updateUserData(data, uid),
};

export default connect(mapStateToProps, mapDispatchToProps)(FitnessStatics);

const styles = StyleSheet.create({
  statText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  setButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    height: 30,
    width: '45%',
    justifyContent: 'center',
  },
  setText: {
    fontSize: 12,
  },
});

/*
Women:

(1.20 x BMI) + (0.23 x Age) - 5.4 = Body Fat Percentage
Men:

(1.20 x BMI) + (0.23 x Age) - 16.2 = Body Fat Percentage



  let monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let [month, day, year] = new Date().toLocaleDateString('en-US').split('/');
  var date = `${day}/${monthNames[month - 1]}/${year}`;
  console.log(date);





*/
