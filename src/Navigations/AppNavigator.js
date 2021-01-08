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
                  fontSize: 25,
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
          title: 'Create New Workout',
          headerStyle: {
            elevation: 0,
          },
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
          title: `DAY ${
            route.params.day
          } - ${route.params.data.name.toUpperCase()}`,
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
          title: '',
          headerStyle: {
            elevation: 0,
          },
        })}
      />

      <MainStack.Screen
        name="PublicWorkoutScreen"
        component={PublicWorkoutScreen}
        options={({route}) => ({
          title: '',
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
      <MainStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({route}) => ({
          title: '',
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: Colors.secondary,
        })}
      />
      <MainStack.Screen
        name="FitnessStatics"
        component={FitnessStatics}
        options={({route}) => ({
          title: '',
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
          fontSize: 15,
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
          headerTitleStyle: {
            color: Colors.primary,
            fontWeight: 'bold',
          },
        }}
      />
      <TopTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'HOME',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.primary,
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <TopTabs.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          title: 'EXPLORE',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.primary,
            fontWeight: 'bold',
          },
        }}
      />
    </TopTabs.Navigator>
  );
};

export default AppNavigator;
