import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import workDays from './workDays';

export default combineReducers({
  alert,
  auth,
  workDays
});
