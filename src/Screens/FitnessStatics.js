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

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

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
                fontSize: responsiveFontSize(3),
              }}
            />
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              color: Colors.secondary,
              padding: 5,
              fontSize: responsiveFontSize(2.1),

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
              fontSize: responsiveFontSize(3),
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
          height: responsiveHeight(20),
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
              fontSize: responsiveFontSize(2.1),
              padding: 12,
              color: Colors.secondary,
            }}>
            BODY FITNESS STATISTICS
          </Text>
        </View>
      </ImageBackground>
      <Text
        style={{
          fontSize: responsiveFontSize(1.7),

          fontWeight: 'bold',
          paddingHorizontal: 5,
          paddingVertical: 4,
          color: Colors.primary,
        }}>
        Statistics
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          marginVertical: 2.5,
          marginBottom: 0,
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
              fontSize: responsiveFontSize(1.7),

              fontWeight: 'bold',
            }}>
            S . No
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
            <Text style={[styles.statText, {fontWeight: 'bold'}]}>DATE</Text>
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
            <Text style={[styles.statText, {fontWeight: 'bold'}]}>WEIGHT</Text>
          </View>
          <View
            style={{
              width: '33.33%',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.statText, {fontWeight: 'bold'}]}>HEIGHT</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{}}>
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
              height: responsiveHeight(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="sad-outline"
              style={{
                fontSize: responsiveFontSize(5),
              }}
            />
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
                fontWeight: 'bold',
              }}>
              OOPS...!
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.7),
              }}>
              NO RECORD YET
            </Text>
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
            fontSize: responsiveFontSize(2),
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
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              elevation: 5,
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
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    DATE
                  </Label>
                  <Input
                    style={{
                      color: Colors.primary,
                      fontSize: responsiveFontSize(1.7),
                    }}
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
                    fontSize: responsiveFontSize(1.7),
                  }}>
                  WEIGHT
                </Label>
                <Input
                  style={{
                    color: Colors.primary,
                    fontSize: responsiveFontSize(1.7),
                  }}
                  keyboardType="number-pad"
                  placeholder="00.00 kg"
                  value={weight}
                  onChangeText={(text) => setWeight(text)}
                />
              </Item>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                }}>
                <Button
                  block
                  style={{
                    height: responsiveHeight(5),
                    backgroundColor: Colors.primary,
                    width: responsiveWidth(30),
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
                      fontSize: responsiveFontSize(1.8),

                      color: Colors.secondary,
                    }}>
                    ADD
                  </Text>
                </Button>
                <Button
                  block
                  style={{
                    backgroundColor: Colors.primary,
                    width: responsiveWidth(30),
                    height: responsiveHeight(5),
                  }}
                  onPress={() => {
                    setModal(false);
                    setDate('');
                    setWeight('');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.8),

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
    fontSize: responsiveFontSize(1.7),
  },
  setButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    height: responsiveHeight(4),
    width: '45%',
    justifyContent: 'center',
  },
  setText: {
    fontSize: responsiveFontSize(1.2),
  },
});
