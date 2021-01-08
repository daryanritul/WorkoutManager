import {SET_PUBLIC_WORKOUT} from './actions.types';

export const setPublicWorkout = (workout) => ({
  type: SET_PUBLIC_WORKOUT,
  payload: workout,
});
