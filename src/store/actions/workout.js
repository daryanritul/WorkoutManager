import {
  ADD_WORKOUT,
  REMOVE_WORKOUT,
  EDIT_WORKOUT,
  ADD_ROUTINE,
  ADD_EXERCISE,
  MARK_AS_DONE,
  WORKOUT_ACTIVE_STATUS,
  UPDATE_ROUTINE_TRACKER,
  MARK_AS_FINISH,
  RESET_WORKOUT,
  SET_WORKOUT,
  REPETITON_STATUS,
  WORKOUT_UPLOADED,
} from '../actions/actions.types';

import database from '@react-native-firebase/database';

export const addWorkout = (workout) => ({
  type: ADD_WORKOUT,
  payload: workout,
});

export const removeWorkout = (id) => ({
  type: REMOVE_WORKOUT,
  payload: id,
});

export const editWorkout = (workout) => ({
  type: EDIT_WORKOUT,
  payload: workout,
});

export const addRoutine = (routine, id) => ({
  type: ADD_ROUTINE,
  payload: {
    routine,
    id,
  },
});

export const markAsDone = (status, workoutId, routineId) => ({
  type: MARK_AS_DONE,
  payload: {
    status,
    workoutId,
    routineId,
  },
});

export const workoutActiveStatus = (id, status) => ({
  type: WORKOUT_ACTIVE_STATUS,
  payload: {
    id,
    status,
  },
});

export const updateRoutineTracker = (id) => ({
  type: UPDATE_ROUTINE_TRACKER,
  payload: id,
});

export const markAsFinish = (id) => ({
  type: MARK_AS_FINISH,
  payload: id,
});

export const resetWorkout = (id, mode) => ({
  type: RESET_WORKOUT,
  payload: {
    id,
    mode,
  },
});

export const repetitionStatus = (id) => ({
  type: REPETITON_STATUS,
  payload: id,
});

export const fetchWorkout = (uid) => async (dispatch) => {
  //  console.log(uid);
  try {
    database()
      .ref('/userData/')
      .child(uid)
      .once('value', (snapshot) => {
        //  console.log(snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_WORKOUT,
            payload: snapshot.val(),
          });
        } else {
          dispatch({
            type: SET_WORKOUT,
            payload: null,
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const setUserWorkoutData = (state, uid) => async (dispatch) => {
  database()
    .ref('/userData/' + uid)
    .set({
      ...state,
    })
    .then(() => console.log('Setting Done'))
    .catch((error) => console.log(error));
};

export const shareWorkout = (workout, uid, name) => async (dispatch) => {
  //  const index6 = state.findIndex((item) => item.id === action.payload.id);
  var workData = workout.workoutData;

  const newWorkoutData = workData.map((value) => ({
    id: value.id,
    name: value.name,
    routineStatus: false,
    exerciseData: value.exerciseData,
  }));
  // console.log('reducer', newWorkoutData);
  const newWorkout = {
    ...workout,
    workoutStatus: {
      activeStatus: false,
      repetition: 0,
      shared: false,
      routineTracker: 0,
      finish: false,
      repetitionStatus: false,
    },
    workoutData: newWorkoutData,
  };

  await database()
    .ref('/publicData/' + uid)
    .set({
      name,
      workout: newWorkout,
    })
    .then(() =>
      dispatch({
        type: WORKOUT_UPLOADED,
        payload: uid,
      }),
    )
    .catch((error) => console.log(error));
};
