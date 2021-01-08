import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';

import database from '@react-native-firebase/database';
import LoadingScreen from './LoadingScreen';
import {Colors} from '../Constants/Color';
import ExploreCard from '../Components/ExploreCard';
import {setPublicWorkout} from '../store/actions/publicWorkout';
import {connect} from 'react-redux';

const ExploreScreen = ({navigation, route, setPublicWorkout}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataState, setDataState] = useState();
  const category = [
    'GENERAL FITNESS',
    'BULKING',
    'CUTTING',
    'STRENGTH',
    'SPORT SPECIFIC',
  ];

  const dataFetch = () => {
    database()
      .ref('/publicData/')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          setPublicWorkout(Object.values(snapshot.val()));
          setDataState(Object.values(snapshot.val()).splice(0, 5));
        } else {
          setPublicWorkout([]);
          setDataState([]);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const susbcriber = dataFetch();
    return susbcriber;
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderCategory = ({item}) => {
    return (
      <View
        style={{
          marginRight: 2.5,
          height: 80,
          width: 150,
          backgroundColor: Colors.primaryLow,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PublicWorkoutScreen', {
              data: dataState.filter(
                (value) => value.workout.target.toUpperCase() === item,
              ),
            })
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.secondary,
              fontWeight: 'bold',
            }}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        margin: 0.5,
        marginBottom: 0,
      }}>
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingHorizontal: 5,
            paddingVertical: 4,
            color: Colors.primary,
          }}>
          Workout Types
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{
              width: '50%',
              paddingRight: 2.5,
            }}>
            <ImageBackground
              source={require('../Assets/Images/gym.jpg')}
              style={{
                width: '100%',
                height: 100,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PublicWorkoutScreen', {
                    data: dataState.filter(
                      (value) => value.workout.type === 'Gym',
                    ),
                  })
                }
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primaryOpacity,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.secondary,
                    fontWeight: 'bold',
                  }}>
                  GYM WORKOUTS
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View
            style={{
              width: '50%',
              paddingLeft: 2.5,
            }}>
            <ImageBackground
              source={require('../Assets/Images/home.jpg')}
              style={{
                width: '100%',
                height: 100,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PublicWorkoutScreen', {
                    data: dataState.filter(
                      (value) => value.workout.type === 'Home',
                    ),
                  })
                }
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primaryOpacity,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.secondary,
                    fontWeight: 'bold',
                  }}>
                  HOME WORKOUTS
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              paddingHorizontal: 5,
              paddingVertical: 4,
              color: Colors.primary,
            }}>
            Workout Categories
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              paddingHorizontal: 5,
              paddingVertical: 4,
              color: Colors.primary,
            }}>
            Scroll {'>'}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            //   margin: 2.5,
          }}>
          <FlatList
            data={category}
            keyExtractor={(index) => index}
            renderItem={renderCategory}
            horizontal={true}
          />
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              paddingHorizontal: 5,
              paddingVertical: 4,
              color: Colors.primary,
            }}>
            Recommended For You
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PublicWorkoutScreen', {
                data: 'All',
              })
            }>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                paddingHorizontal: 10,
                paddingVertical: 4,
                color: Colors.primary,
              }}>
              Explore More
            </Text>
          </TouchableOpacity>
        </View>
        {dataState.map((item, index) => (
          <View key={index}>
            <ExploreCard
              item={item}
              navigation={navigation}
              routeName={route.name}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          //  marginHorizontal: 5,
          marginVertical: 2.5,
        }}>
        <ImageBackground
          source={require('../Assets/Images/Image.jpg')}
          style={{
            flex: 1,
            width: '100%',
            height: 100,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.primaryOpacity,
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('PublicWorkoutScreen', {
                data: 'All',
              })
            }>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                paddingHorizontal: 10,
                textAlign: 'center',
                paddingVertical: 5,
                color: Colors.secondary,
              }}>
              EXPLORE MORE WORKOUTS
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  setPublicWorkout: (data) => setPublicWorkout(data),
};

export default connect(null, mapDispatchToProps)(ExploreScreen);

const styles = StyleSheet.create({
  bodyText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 20,
  },
  bodyHead: {
    color: Colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
  },
  bodyFoot: {
    color: Colors.secondary,
    fontWeight: 'bold',
    padding: 5,
  },
});
