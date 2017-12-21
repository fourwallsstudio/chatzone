import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import {
  FETCH_CHATROOMS_REQUEST,
  FETCH_CHATROOMS_SUCCESS,
  FETCH_CHATROOMS_ERROR,
  JOIN_CHAT,
  LEAVE_CHAT,
} from 'reducers/chatroom_reducer';

const fetchChatRooms = () => axios.get('/chatrooms');

function* handleFetchChatRooms() {
  try {
    const res = yield call(fetchChatRooms);
    yield put({ type: FETCH_CHATROOMS_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: FETCH_CHATROOMS_ERROR, payload: error });
  }
}

export function* waitingFetchChatRooms() {
  while (true) {
    yield take(FETCH_CHATROOMS_REQUEST);
    yield fork(handleFetchChatRooms);
  }
}

const socket = io();

socket.on('joined_chat', data => console.log('msg', data));
socket.on('left_chat', data => console.log('msg', data));

const joinChat = data => socket.emit('join', data);

function* handleJoinChat(data) {
  console.log('handlejoin', data);
  yield call(joinChat, JSON.stringify(data));
  yield put(push(`/${data.chatroom}`));  
}

const leaveChat = data => socket.emit('leave', data);

function* handleLeaveChat(data) {
  yield call(leaveChat, JSON.stringify(data));
  yield put(push('/'));
}

export function* connectionFlow() {
  while (true) {
    const { joinData } = yield take(JOIN_CHAT);
    yield fork(handleJoinChat, joinData);
    const { leaveData } = yield take(LEAVE_CHAT);
    yield call(handleLeaveChat, leaveData);
  }
};
