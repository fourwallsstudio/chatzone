import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { routerReducer } from 'react-router-redux';
import sessionReducer from 'reducers/session_reducer';
import uiReducer from 'reducers/ui_reducer';
import chatroomReducer from 'reducers/chatroom_reducer';
import messageReducer from 'reducers/message_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  session: sessionReducer,
  ui: uiReducer,
  chatroom: chatroomReducer,
  routing: routerReducer,
  messages: messageReducer,
});

export default rootReducer;
