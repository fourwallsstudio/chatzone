import { combineReducers } from 'redux-immutable';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
});

export default rootReducer;
