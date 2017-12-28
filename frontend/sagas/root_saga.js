import { all } from 'redux-saga/effects';
import { 
  waitingLogin, 
  waitingLogout,
  waitingSignup, 
  waitingCurrentUser 
} from 'sagas/session_saga';  
import { 
  waitingFetchChatRooms,
  waitingFetchMembers,
  joinLeaveChatFlow,
  socketSagas, 
} from 'sagas/chatroom_saga';
import { 
  waitingCreateMessage, 
  waitingFetchMessages,
 } from 'sagas/message_saga';

export default function* rootSaga() {
  yield all([
    waitingLogin(),
    waitingLogout(),
    waitingSignup(),
    waitingCurrentUser(),
    waitingFetchChatRooms(),
    waitingFetchMembers(),
    joinLeaveChatFlow(),
    socketSagas(),
    waitingCreateMessage(),
    waitingFetchMessages(),
  ]);
};
