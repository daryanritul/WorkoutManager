import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {connect, Provider, useDispatch} from 'react-redux';
import {SET_USER, IS_AUTHENTICATED} from './src/store/actions/actions.types';
import {fetchWorkout, setUserWorkoutData} from './src/store/actions/workout';

import LoadingScreen from './src/Screens/LoadingScreen';
import AppNavigator from './src/Navigations/AppNavigator';
import AuthNavigator from './src/Navigations/AuthNavigator';

const App = ({authState, listState, fetchWorkout, setUserWorkoutData}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user) => {
    if (user) {
      await database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
      fetchWorkout(user._user.uid);
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  useEffect(() => {
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  useEffect(() => {
    if (authState.user) setUserWorkoutData(listState, authState.user.uid);
  }, [listState]);

  if (authState.loading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      {authState.isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  listState: state.workout,
});

const mapDispatchToProps = {
  fetchWorkout: (uid) => fetchWorkout(uid),
  setUserWorkoutData: (state, uid) => setUserWorkoutData(state, uid),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
