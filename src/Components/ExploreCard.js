import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {Colors} from '../Constants/Color';
import {imageArray} from '../Constants/Utility';

const ExploreCard = ({item, navigation, routeName}) => {
  const imageUrl = imageArray[item.workout.imageUrl];
  return (
    <View
      style={{
        marginVertical: 2.5,
      }}>
      <ImageBackground
        source={imageUrl}
        style={{
          flex: 1,
          width: responsiveWidth(100),
          height: responsiveHeight(18),
        }}
        imageStyle={{}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryOpacity,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.bodyHead}>{item.workout.level}</Text>
            <Text style={styles.bodyHead}>{item.workout.target}</Text>
            <Text style={styles.bodyHead}>{item.workout.type}</Text>
            <Text style={styles.bodyHead}>
              {item.workout.workoutData.length} Days
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WorkoutScreen', {
                data: item.workout,
                routeName,
              });
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.bodyText}>
              {item.workout.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //  backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <Text style={styles.bodyFoot}>{item.workout.muscleGroup}</Text>
            <Text style={styles.bodyFoot}>
              Created & Shared By - {item.name}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({
  bodyText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
    fontSize: responsiveFontSize(2.1),
  },
  bodyHead: {
    color: Colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
    fontSize: responsiveFontSize(1.7),
  },
  bodyFoot: {
    color: Colors.secondary,
    fontWeight: 'bold',
    padding: 3,
    paddingHorizontal: 10,
    fontSize: responsiveFontSize(1.7),
  },
});
