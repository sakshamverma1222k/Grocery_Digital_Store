import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import * as types from '../actions/actionTypes';

const AppReducer = combineReducers({
  
  loginReducer:LoginReducer

});

// Clean state when user logs out
export const rootReducer = (state: any = {}, action) => {
  if (action.type === types.LOGOUT) {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }

  return AppReducer(state, action);
};
export default rootReducer;