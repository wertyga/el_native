import { combineReducers } from 'redux';

import { userReducer } from './user';
import { pairsReducer } from './pairs';
import { tradePairsReducer } from './tradePairs';


export const rootReducer =  combineReducers({
    user: userReducer,
    pairs: pairsReducer,
    tradePairs: tradePairsReducer,
});