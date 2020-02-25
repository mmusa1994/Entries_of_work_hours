import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_WORK_DAY,
  ADD_WORK_DAY_ERROR,
  DELETE_DAY,
  GET_TABLE,
  TABLE_ERROR,
  UPDATE_WORK_DAY,
  GET_DAY,
  GET_DAY_ERROR
} from './types';

//Add WorkDay
export const addWorkDay = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/workday/input', formData, config);

    dispatch({
      type: ADD_WORK_DAY,
      payload: res.data
    });

    dispatch(setAlert('Work Day Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADD_WORK_DAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete WorkDay
export const deleteWorkDay = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/workday/${id}`);
    dispatch({
      type: DELETE_DAY,
      payload: res.data
    });
    dispatch(setAlert('WorkDay Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_WORK_DAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Workdays
export const getTableOfWorkDays = () => async dispatch => {
  try {
    const res = await axios.get('api/workday/table');

    dispatch({
      type: GET_TABLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TABLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get WorkDay
export const getWorkDay = id => async dispatch => {
  try {
    const res = await axios.get(`api/workday/edit/${id}`);

    dispatch({
      type: GET_DAY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_DAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Update WorkDay
export const updateWorkDay = id => async dispatch => {
  try {
    const res = await axios.put(`/api/workday/${id}`);
    dispatch({
      type: UPDATE_WORK_DAY,
      payload: res.data
    });
    dispatch(setAlert('WorkDay Updated', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_WORK_DAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
