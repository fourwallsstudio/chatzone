import { take, fork, call, put } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import axios from 'axios';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import {
  FETCH_CHATROOMS_REQUEST,
  FETCH_CHATROOMS_SUCCESS,
  FETCH_CHATROOMS_ERROR,
  JOIN_CHAT,
  LEAVE_CHAT,
  UPDATE_CURRENT_CHAT,
  ADD_CHAT_MEMBER,
  REMOVE_CHAT_MEMBER,
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_ERROR,
} from 'reducers/chatroom_reducer';
import { RECEIVE_NEW_MESSAGE } from 'reducers/message_reducer';
import { authHeader } from '../util/session_util';

const fetchChatRooms = () => {
  return axios.request({
    url: '/chatrooms',
    method: 'get',
    headers: { 'Authorization': authHeader() },
  })
};

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

const fetchMembers = (chatroom) => {
  return axios.request({
    url: `/members/${chatroom}`,
    method: 'get',
    headers: { 'Authorization': authHeader() },
  })
};

function* handleFetchMembers(chatroom) {
  try {
    const res = yield call(fetchMembers, chatroom);
    yield put({ type: FETCH_MEMBERS_SUCCESS, payload: res.data });
  } catch(error) {
    yield put({ type: FETCH_MEMBERS_ERROR, payload: error });
  }
}

export function* waitingFetchMembers() {
  while (true) {
    const { chatroom } = yield take(FETCH_MEMBERS_REQUEST);
    yield fork(handleFetchMembers, chatroom)
  }
}

const socket = io({ secure: true });


const joinChat = data => socket.emit('join', data);

function* handleJoinChat(data) {
  yield call(joinChat, JSON.stringify(data));
  yield put({ type: UPDATE_CURRENT_CHAT, payload: data });
  yield put(push(`/${data.chatroom}`));  
}

const leaveChat = data => socket.emit('leave', data);

function* handleLeaveChat(data) {
  yield call(leaveChat, JSON.stringify(data));
  yield put({ type: UPDATE_CURRENT_CHAT, payload: null });
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

function socketInitChannel() {
  return eventChannel( emitter => {
    
    const handleJoin = data => {
      console.log('handle join', data.username)
      emitter({ type: ADD_CHAT_MEMBER, payload: data.username })
    }

    const handleLeft = data => {
      console.log('handle left', data.username)
      emitter({ type: REMOVE_CHAT_MEMBER, payload: data.username })
    }

    const handleNewMessage = data => {
      console.log('handle new msg', data)
      emitter({ type: RECEIVE_NEW_MESSAGE, payload: data })
    }
 
    socket.on('joined_chat', data => {
      console.log('join chat emit received')
      handleJoin(data);
    });
     
    socket.on('left_chat', data => {
      console.log('left chat received')
      handleLeft(data);
    });

    socket.on('new_message', data => {
      console.log('new messsage received') 
      handleNewMessage(data);
    });

    return () => {}
  });
}

export function* socketSagas() {
  const channel = yield call(socketInitChannel)
  while (true) {
    const action = yield take(channel)
    yield put(action);
  }
}
