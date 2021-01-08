import {
  ADD_ROUTINE,
  ADD_WORKOUT,
  EDIT_WORKOUT,
  MARK_AS_DONE,
  MARK_AS_FINISH,
  REMOVE_WORKOUT,
  REPETITON_STATUS,
  RESET_WORKOUT,
  SET_WORKOUT,
  UPDATE_ROUTINE_TRACKER,
  WORKOUT_ACTIVE_STATUS,
  WORKOUT_UPLOADED,
} from '../actions/actions.types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, action.payload];

    case ADD_ROUTINE:
      const index = state.findIndex((item) => item.id === action.payload.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          workoutData: state[index].workoutData
            ? [...state[index].workoutData, action.payload.routine]
            : [action.payload.routine],
        },
        ...state.slice(index + 1),
      ];

    case MARK_AS_DONE:
      const index1 = state.findIndex(
        (item) => item.id === action.payload.workoutId,
      );
      const index2 = state[index1].workoutData.findIndex(
        (item) => item.id === action.payload.routineId,
      );
      return [
        ...state.slice(0, index1),
        {
          ...state[index1],
          workoutData: [
            ...state[index1].workoutData.slice(0, index2),
            {
              ...state[index1].workoutData[index2],
              routineStatus: action.payload.status,
            },
            ...state[index1].workoutData.slice(index2 + 1),
          ],
        },
        ...state.slice(index1 + 1),
      ];

    case REMOVE_WORKOUT:
      return state.filter((itemData) => itemData.id !== action.payload);

    case WORKOUT_ACTIVE_STATUS:
      const index3 = state.findIndex((item) => item.id === action.payload.id);

      return [
        ...state.slice(0, index3),
        {
          ...state[index3],
          workoutStatus: {
            ...state[index3].workoutStatus,
            activeStatus: action.payload.status,
          },
        },
        ...state.slice(index3 + 1),
      ];

    case UPDATE_ROUTINE_TRACKER:
      const index4 = state.findIndex((item) => item.id === action.payload);
      return [
        ...state.slice(0, index4),
        {
          ...state[index4],
          workoutStatus: {
            ...state[index4].workoutStatus,
            routineTracker: state[index4].workoutStatus.routineTracker + 1,
          },
        },
        ...state.slice(index4 + 1),
      ];

    case MARK_AS_FINISH:
      const index5 = state.findIndex((item) => item.id === action.payload);
      return [
        ...state.slice(0, index5),
        {
          ...state[index5],
          workoutStatus: {
            ...state[index5].workoutStatus,
            finish: true,
            repetition: state[index5].workoutStatus.repetition + 1,
          },
        },
        ...state.slice(index5 + 1),
      ];

    case REPETITON_STATUS:
      const indexRep = state.findIndex((item) => item.id === action.payload);
      return [
        ...state.slice(0, indexRep),
        {
          ...state[indexRep],
          workoutStatus: {
            ...state[indexRep].workoutStatus,
            repetitionStatus: !state[indexRep].workoutStatus.repetitionStatus,
          },
        },
        ...state.slice(indexRep + 1),
      ];

    case WORKOUT_UPLOADED:
      const indexUp = state.findIndex((item) => item.id === action.payload);
      return [
        ...state.slice(0, indexUp),
        {
          ...state[indexUp],
          workoutStatus: {
            ...state[indexUp].workoutStatus,
            shared: true,
          },
        },
        ...state.slice(indexUp + 1),
      ];

    case RESET_WORKOUT:
      const index6 = state.findIndex((item) => item.id === action.payload.id);
      var workData = state[index6].workoutData;

      const newWorkoutData = workData.map((value) => ({
        id: value.id,
        name: value.name,
        routineStatus: false,
        exerciseData: value.exerciseData,
      }));
      // console.log('reducer', newWorkoutData);
      return [
        ...state.slice(0, index6),
        {
          ...state[index6],
          workoutStatus: {
            activeStatus: false,
            repetition: action.payload.mode
              ? 0
              : state[index6].workoutStatus.repetition,
            shared: false,
            routineTracker: 0,
            finish: false,
            repetitionStatus: action.payload.mode ? false : true,
          },
          workoutData: newWorkoutData,
        },
        ...state.slice(index6 + 1),
      ];

    case SET_WORKOUT:
      // console.log(action.payload);
      if (action.payload) return action.payload;
      else return [];

    default:
      return state;
  }
};
