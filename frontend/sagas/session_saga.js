import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
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
} from 'reducers/session_reducer';
import {
  setAuthTokenOnLocalStorage,
  getAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
} from '../util/session_util';

const authHeader = () => `Bearer ${getAuthTokenFromLocalStorage()}`;

const login = formData => axios.post('/login', formData);

function* handleLogin(formData) {
  try {
    const res = yield call(login, formData);
    setAuthTokenOnLocalStorage(res.data.auth_token);
    yield put({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
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
  } catch (error) {
    yield put({ type: LOGOUT_ERROR, payload: error });
  }
};

const signup = formData => axios.post('/signup', formData);

function* handleSignup(formData) {
  try {
    const res = yield call(signup, formData);
    setAuthTokenOnLocalStorage(res.data.auth_token);
    yield put({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, payload: error });
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
    yield put({ type: FETCH_CURRENT_USER_ERROR, payload: error });
  }
};

export function* loginFlow() {
  while (true) {
    const { formData } = yield take(LOGIN_REQUEST);
    yield fork(handleLogin, formData);
    yield take(LOGOUT_REQUEST);
    yield call(handleLogout);
  }
 };

export function* signupFlow() {
  while (true) {
    const { formData } = yield take(SIGNUP_REQUEST);
    yield fork(handleSignup, formData);
    yield take(LOGOUT_REQUEST);
    yield call(handleLogout);
  }
};

export function* currentUserFlow() {
  while (true) {
    yield take(FETCH_CURRENT_USER_REQUEST);
    yield fork(handleFetchCurrentUser);
    yield take(LOGOUT_REQUEST);
    yield call(handleLogout);
  }
};
