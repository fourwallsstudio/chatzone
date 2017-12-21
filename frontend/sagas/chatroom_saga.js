import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CHATROOMS_REQUEST,
  FETCH_CHATROOMS_SUCCESS,
  FETCH_CHATROOMS_ERROR,
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
