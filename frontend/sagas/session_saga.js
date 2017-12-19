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
} from 'reducers/session_reducer';

const login = formData => axios.post('/login', formData);

function* handleLogin(formData) {
  try {
    const res = yield call(login, formData);
    yield put({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  }
};

const logout = id => axios.post('/logout', id);

function* handleLogout(id) {
  try {
    const res = yield call(logout, id);
    yield put({ type: LOGOUT_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: LOGOUT_ERROR, payload: error });
  }
};

const signup = formData => axios.post('/signup', formData);

function* handleSignup(formData) {
  try {
    const res = yield call(signup, formData);
    yield put({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, payload: error });
  }
};

export function* loginFlow() {
  while (true) {
    const { formData } = yield take(LOGIN_REQUEST);
    yield fork(handleLogin, formData);
    const { id } = yield take(LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
 };

export function* signupFlow() {
  while (true) {
    const { formData } = yield take(SIGNUP_REQUEST);
    yield fork(handleSignup, formData);
    const { id } = yield take(LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
};
