import { Map } from 'immutable';

export const LOGIN_REQUEST = 'SESSION::LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'SESSION::LOGIN_SUCCESS';
export const LOGIN_ERROR = 'SESSION::LOGIN_ERROR'; 
export const LOGOUT_REQUEST = 'SESSION::LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'SESSION::LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'SESSION::LOGOUT_ERROR'; 
export const SIGNUP_REQUEST = 'SESSION::SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SESSION::SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SESSION::SIGNUP_ERROR'; 

export const login = formData => ({ type: LOGIN_REQUEST, formData });
export const logout = id => ({ type: LOGOUT_REQUEST, id });
export const signup = formData => ({ type: SIGNUP_REQUEST, formData });

const defaultState = new Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return state
        .set('currentUser', Map(action.payload))
        .set('error', '');

    case LOGOUT_SUCCESS:
      return state
        .set('currentUser', null)
        .set('error', '');

    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGNUP_ERROR:
      return state
        .set('currentUser', null)
        .set('error', action.payload);
    default:
      return state;
  }
};

export default sessionReducer;
