import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  session: sessionReducer,
});

export default rootReducer;
