import {Icon} from 'native-base';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ExploreCard from '../Components/ExploreCard';
import {Colors} from '../Constants/Color';

const PublicWorkoutScreen = ({navigation, route, publicState}) => {
  const {data} = route.params;
  const dataState = data === 'All' ? publicState : data;

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require('../Assets/Images/Image.jpg')}
          style={{
            width: '100%',
            height: 100,
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
                color: Colors.secondary,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              WORKOUTS
            </Text>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingHorizontal: 10,
            paddingVertical: 4,
            color: Colors.primary,
          }}>
          Workouts
        </Text>
      </View>
      <ScrollView>
        {dataState.length ? (
          dataState.map((item, index) => (
            <View key={index}>
              <ExploreCard
                item={item}
                navigation={navigation}
                routeName={route.name}
              />
            </View>
          ))
        ) : (
          <View
            style={{
              height: 600,
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
            <Text>No Workout Found</Text>
          </View>
        )}
      </ScrollView>
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
