import { all } from 'redux-saga/effects';
import { loginFlow, signupFlow, currentUserFlow } from 'sagas/session_saga';  
import { 
  waitingFetchChatRooms,
  waitingFetchMembers,
  connectionFlow,
  socketSagas, 
} from 'sagas/chatroom_saga';
import { 
  waitingCreateMessage, 
  waitingFetchMessages,
 } from 'sagas/message_saga';

export default function* rootSaga() {
  yield all([
    loginFlow(),
    signupFlow(),
    currentUserFlow(),
    waitingFetchChatRooms(),
    waitingFetchMembers(),
    connectionFlow(),
    socketSagas(),
    waitingCreateMessage(),
    waitingFetchMessages(),
  ]);
};
