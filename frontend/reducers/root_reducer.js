import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import sessionReducer from 'reducers/session_reducer';
import uiReducer from 'reducers/ui_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  session: sessionReducer,
  ui: uiReducer,
});

export default rootReducer;
