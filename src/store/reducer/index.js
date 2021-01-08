import {combineReducers} from 'redux';

import workout from './workout';
import auth from './auth';
import publicWorkout from './publicWorkout';

export default combineReducers({
  workout,
  auth,
  publicWorkout,
});
