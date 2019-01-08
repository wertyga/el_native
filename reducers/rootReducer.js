import { combineReducers } from 'redux';
import  { CLEAR_USER } from '../actions/constants';

import { userReducer } from './user';
import { pairsReducer } from './pairs';
import { tradePairsReducer } from './tradePairs';
import { menuReducer } from './menu';
import { whaleReducer } from './whaleOrders';
import { powerReducer } from './power';

export const appReducer =  combineReducers({
  user: userReducer,
  pairs: pairsReducer,
  tradePairs: tradePairsReducer,
  menu: menuReducer,
  whaleOrders: whaleReducer,
  powerPercents: powerReducer,
});

export const rootReducer = (state, action) => {
  if(action.type === CLEAR_USER) {
    state = undefined;
  }
  return appReducer(state, action);
}