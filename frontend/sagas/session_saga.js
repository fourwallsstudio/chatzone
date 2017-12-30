import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_ERROR,
  UPDATE_CURRENT_USER_REQUEST,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_ERROR,
} from 'reducers/session_reducer';
import {
  setAuthTokenOnLocalStorage,
  getAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
  authHeader,
} from '../util/session_util';


const login = formData => axios.post('/login', formData);

function* handleLogin(formData) {
  try {
    const res = yield call(login, formData);
    setAuthTokenOnLocalStorage(res.data.auth_token);
    yield put({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    const payload = error.response.data.message;
    yield put({ type: LOGIN_ERROR, payload });
  }
};

const logout = () => {
  return axios.request({
    url: '/logout',
    method: 'post',
    headers: { 'Authorization': authHeader() },
  })
};

function* handleLogout() {
  try {
    const res = yield call(logout);
    removeAuthTokenFromLocalStorage();
    yield put({ type: LOGOUT_SUCCESS, payload: res.data });
    yield put(push('/')); 
  } catch (error) {
    const payload = error.response.data.message;
    yield put({ type: LOGOUT_ERROR, payload });
  }
};

const signup = formData => axios.post('/signup', formData);

function* handleSignup(formData) {
  try {
    const res = yield call(signup, formData);
    setAuthTokenOnLocalStorage(res.data.auth_token);
    yield put({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    const payload = error.response.data.message;
    yield put({ type: SIGNUP_ERROR, payload });
  }
};

const fetchCurrentUser = () => {
  return axios.request({
    url: '/current_user',
    method: 'get',
    headers: { 'Authorization': authHeader() },
  })
};

function* handleFetchCurrentUser() {
  try {
    const res = yield call(fetchCurrentUser);
    yield put({ type: FETCH_CURRENT_USER_SUCCESS, payload: res.data });
  } catch (error) {
    removeAuthTokenFromLocalStorage();
    const payload = error.response.data.message;
    yield put({ type: FETCH_CURRENT_USER_ERROR, payload });
  }
};

const config = () => ({ headers: { 'Authorization': authHeader() } });
const updateCurrentUser = formData => axios.post('/update_current_user', formData);

function* handleUpdateCurrentUser(formData) {
  try {
    const res = yield call(updateCurrentUser, formData);
    yield put({ type: UPDATE_CURRENT_USER_SUCCESS, payload: res.data });
  } catch (error) {
    const payload = error.response.data;
    yield put({ type: UPDATE_CURRENT_USER_ERROR, payload });
  }
};

export function* waitingLogin() {
  while (true) {
    const { formData } = yield take(LOGIN_REQUEST);
    yield fork(handleLogin, formData);
  }
};

export function* waitingLogout() {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield call(handleLogout);
  }
}

export function* waitingSignup() {
  while (true) {
    const { formData } = yield take(SIGNUP_REQUEST);
    yield fork(handleSignup, formData);
  }
};

export function* waitingCurrentUser() {
  while (true) {
    yield take(FETCH_CURRENT_USER_REQUEST);
    yield fork(handleFetchCurrentUser);
  }
};

export function* waitingUpdateCurrentUser() {
  while (true) {
    const { formData } = yield take(UPDATE_CURRENT_USER_REQUEST);
    yield fork(handleUpdateCurrentUser, formData);
  }
};
