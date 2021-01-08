import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {toastMessage} from '../../Constants/Utility';
import {IS_AUTHENTICATED, SET_USER} from './actions.types';

export const signUpUser = (data) => async (dispatch) => {
  const {name, email, password, age, height, weight, gender} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          uid: data.user.uid,
          age,
          gender,
          height,
          weight,
          level: 'Beginner',
        })
        .then(() => console.log('SUCCESS'));
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toastMessage('E-mail already in use.');

          break;
        case 'auth/invalid-email':
          toastMessage('Invalid email address');

          break;
        case 'auth/weak-password':
          toastMessage('Password is too weak.');

          break;
        case 'auth/too-many-requests':
          toastMessage('Too many request. Try again in a minute.');

          break;
        default:
          toastMessage('Check your internet connection.');
      }
    });
};

export const updateUserData = (data) => async (dispatch) => {
  const {uid, age, height, weight, level, bodyStat} = data;

  database()
    .ref('/users/')
    .child(uid)
    .update({
      age,
      height,
      weight,
      level,
      bodyStat,
    })
    .then(() => console.log('SUCCESS'));
};

export const signInUser = (data) => async (dispatch) => {
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      toastMessage('Sign-In Sucess');
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-email':
          toastMessage('Invalid email address');

          break;
        case 'auth/user-not-found':
          toastMessage('User not found, Sign Up First');
          break;
        case 'auth/wrong-password':
          toastMessage('Incorrect Password');
          break;
        case 'auth/too-many-requests':
          toastMessage('Too many request. Try again in a minute.');
          break;
        default:
          toastMessage('Check your internet connection.');
      }
    });
};

export const signOutUser = () => async (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      toastMessage('Sign Out Sucess');

      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
      dispatch({
        type: SET_USER,
        payload: null,
      });
    })
    .catch((error) => {
      toastMessage('Sign Out Failed');
    });
};
