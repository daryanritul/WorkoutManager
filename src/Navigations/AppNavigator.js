import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';

import {Icon} from 'native-base';
import {Colors} from '../Constants/Color';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../Screens/HomeScreen';
import MyWorkoutsScreen from '../Screens/MyWorkoutsScreen';
import AddWorkoutScreen from '../Screens/AddWorkoutScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import WorkoutScreen from '../Screens/WorkoutScreen';
import RoutineScreen from '../Screens/RoutineScreen';
import AddExerciseScreen from '../Screens/AddExerciseScreen';
import PublicWorkoutScreen from '../Screens/PublicWorkoutScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import FitnessStatics from '../Screens/FitnessStatics';

const TopTabs = createMaterialTopTabNavigator();
const MainStack = createStackNavigator();

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const AppNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="TopTabsNavigator"
        component={TopTabsNavigator}
        options={({navigation}) => ({
          title: 'WORKOUT MANAGER',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.primary,
            fontSize: responsiveFontSize(2.1),
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Icon
                name="person-circle-sharp"
                style={{
                  color: Colors.primary,
                  marginHorizontal: 10,
                  fontSize: responsiveFontSize(3),
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('FitnessStatics')}>
              <Icon
                name="podium-sharp"
                style={{
                  color: Colors.primary,
                  marginHorizontal: 10,
                  fontSize: responsiveFontSize(3),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name="AddWorkoutScreen"
        component={AddWorkoutScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        }}
      />

      <MainStack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={({route}) => ({
          title: route.params.data.name,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
      <MainStack.Screen
        name="RoutineScreen"
        component={RoutineScreen}
        options={({route}) => ({
          headerTitleAlign: 'center',
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
          headerStyle: {
            elevation: 0,
          },
        })}
      />
      <MainStack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={({route}) => ({
          headerTitle: false,

          headerStyle: {
            elevation: 0,
          },
        })}
      />

      <MainStack.Screen
        name="PublicWorkoutScreen"
        component={PublicWorkoutScreen}
        options={({route}) => ({
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
      <MainStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({route}) => ({
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
      <MainStack.Screen
        name="FitnessStatics"
        component={FitnessStatics}
        options={({route}) => ({
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
    </MainStack.Navigator>
  );
};

const TopTabsNavigator = () => {
  return (
    <TopTabs.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: Colors.primary,
        style: {
          backgroundColor: Colors.secondary,
        },
        labelStyle: {
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.5),
        },
        indicatorStyle: {
          backgroundColor: Colors.primary,
        },
      }}>
      <TopTabs.Screen
        name="MyWorkoutsScreen"
        component={MyWorkoutsScreen}
        options={{
          title: 'WORKOUTS',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
        }}
      />
      <TopTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'HOME',
          headerTitleAlign: 'center',
        }}
      />
      <TopTabs.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          title: 'EXPLORE',
          headerTitleAlign: 'center',
        }}
      />
    </TopTabs.Navigator>
  );
};

export default AppNavigator;
