import {Icon} from 'native-base';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ExploreCard from '../Components/ExploreCard';
import {Colors} from '../Constants/Color';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const PublicWorkoutScreen = ({navigation, route, publicState}) => {
  const {data} = route.params;
  const dataState = data === 'All' ? publicState : data;

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require('../Assets/Images/Image.jpg')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(15),
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
                color: Colors.secondary,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.1),
              }}>
              WORKOUTS
            </Text>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            paddingHorizontal: 10,
            paddingVertical: 4,
            color: Colors.primary,
          }}>
          Workouts
        </Text>
      </View>
      {dataState.length ? (
        <ScrollView>
          {dataState.map((item, index) => (
            <View key={index}>
              <ExploreCard
                item={item}
                navigation={navigation}
                routeName={route.name}
              />
            </View>
          ))}
        </ScrollView>
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
              fontSize: responsiveFontSize(1.5),
            }}>
            No Workout Found
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  publicState: state.publicWorkout,
});

export default connect(mapStateToProps, null)(PublicWorkoutScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});
