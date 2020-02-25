import {
  ADD_WORK_DAY,
  DELETE_DAY,
  GET_TABLE,
  TABLE_ERROR,
  UPDATE_WORK_DAY,
  GET_DAY,
  GET_DAY_ERROR
} from '../actions/types';

const initialState = {
  data: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_WORK_DAY:
    case UPDATE_WORK_DAY:
      return {
        ...state,
        data: [...state.data, payload],
        loading: false
      };
    case DELETE_DAY:
      return {
        ...state,
        data: state.data.filter(day => day._id !== payload.workday._id)
      };
    case GET_TABLE:
    case GET_DAY:
      return {
        ...state,
        data: payload,
        loading: false
      };
    case TABLE_ERROR:
    case GET_DAY_ERROR:
      return {
        ...state,
        data: [],
        loading: false
      };
    default:
      return state;
  }
}
