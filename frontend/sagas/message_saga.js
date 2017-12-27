import { take, fork, call, put } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import axios from 'axios';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import {
  CREATE_MESSAGE_REQUEST,
  RECEIVE_NEW_MESSAGE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
} from 'reducers/message_reducer';
import { authHeader } from '../util/session_util';

// const createMessage = msg => axios.post('/messages', msg);

const createMessage = (msg) => {
  return axios.request({
    url: '/messages',
    method: 'post',
    data: msg,
    headers: { 'Authorization': authHeader() },
  })
};

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

const fetchMessages = (ch, pg) => {
  return axios.request({
    url: `/messages/${ch}/${pg}`,
    method: 'get',
    headers: { 'Authorization': authHeader() },
  })
};


function* handleFetchMessages(chatroom, page) {
  try {
    const res = yield call(fetchMessages, chatroom, page);
    yield put({ type: FETCH_MESSAGES_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: FETCH_MESSAGES_ERROR, payload: error });
  }
}

export function* waitingFetchMessages() {
  while (true) {
    const { chatroom, page } = yield take(FETCH_MESSAGES_REQUEST);
    yield fork(handleFetchMessages, chatroom, page);
  }
}
