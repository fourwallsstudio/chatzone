import { take, fork, call, put } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import axios from 'axios';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import {
  CREATE_MESSAGE_REQUEST,
  RECEIVE_NEW_MESSAGE,
} from 'reducers/message_reducer';

const createMessage = msg => axios.post('/messages', msg);

function* handleCreateMessage(msg) {
  try {
    const res = yield call(createMessage, msg);
    // new messages are broadcasted through socketio after created
  } catch (error) {
  }
}

export function* waitingCreateMessage() {
  while (true) {
    const { msg } = yield take(CREATE_MESSAGE_REQUEST);
    yield fork(handleCreateMessage, msg);
  }
}
