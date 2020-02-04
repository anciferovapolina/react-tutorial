import { combineReducers } from 'redux';
import gameReducer from './game';

const rootReducer = combineReducers({ gameReducer });

export default rootReducer;
