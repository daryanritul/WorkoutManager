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

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

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
      .once('value', (snapshot) => {
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
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderCategory = ({item}) => {
    return (
      <View
        style={{
          marginRight: 2.5,
          height: responsiveHeight(10),
          width: responsiveWidth(40),
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
              fontSize: responsiveFontSize(1.8),
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
            fontSize: responsiveFontSize(1.7),
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
          <ImageBackground
            source={require('../Assets/Images/gym.jpg')}
            style={{
              width: responsiveWidth(49.5),
              height: responsiveHeight(12),
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
                  fontSize: responsiveFontSize(2.1),
                  color: Colors.secondary,
                  fontWeight: 'bold',
                }}>
                GYM WORKOUTS
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            source={require('../Assets/Images/home.jpg')}
            style={{
              width: responsiveWidth(49.5),

              height: responsiveHeight(12),
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
                  fontSize: responsiveFontSize(2.1),
                  color: Colors.secondary,
                  fontWeight: 'bold',
                }}>
                HOME WORKOUTS
              </Text>
            </TouchableOpacity>
          </ImageBackground>
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
              fontSize: responsiveFontSize(1.7),
              fontWeight: 'bold',
              paddingHorizontal: 5,
              paddingVertical: 4,
              color: Colors.primary,
            }}>
            Workout Categories
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(1.2),
              fontWeight: 'bold',
              paddingHorizontal: 5,
              paddingVertical: 4,
              color: Colors.primary,
            }}>
            Scroll Right {'->'}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
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
              fontSize: responsiveFontSize(1.7),
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
                fontSize: responsiveFontSize(1.7),
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
            width: responsiveWidth(100),
            height: responsiveHeight(15),
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
                fontSize: responsiveFontSize(2.1),
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
