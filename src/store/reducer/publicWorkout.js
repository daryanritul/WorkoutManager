import {SET_PUBLIC_WORKOUT} from '../actions/actions.types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PUBLIC_WORKOUT:
      return action.payload;

    default:
      return state;
  }
};
