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
export const FETCH_CURRENT_USER_REQUEST = 'SESSION::FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'SESSION::FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_ERROR = 'SESSION::FETCH_CURRENT_USER_ERROR';
export const UPDATE_CURRENT_USER_REQUEST = 'SESSION::UPDATE_USER_REQUEST';
export const UPDATE_CURRENT_USER_SUCCESS = 'SESSION::UPDATE_USER_SUCCESS';
export const UPDATE_CURRENT_USER_ERROR = 'SESSION::UPDATE_USER_ERROR';

export const login = formData => ({ type: LOGIN_REQUEST, formData });
export const signup = formData => ({ type: SIGNUP_REQUEST, formData });
export const logout = () => ({ type: LOGOUT_REQUEST });
export const fetchCurrentUser = () => ({ type: FETCH_CURRENT_USER_REQUEST });
export const updateCurrentUser = formData => ({ type: UPDATE_CURRENT_USER_REQUEST, formData });

const defaultState = new Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, { type, payload }) => {
  switch(type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case FETCH_CURRENT_USER_SUCCESS:
      return state
        .set('currentUser', Map(payload))
        .set('error', '');

    case LOGOUT_SUCCESS:
      return state
        .set('currentUser', null)
        .set('error', '');
    
    case UPDATE_CURRENT_USER_SUCCESS:
      const newUser = state.get('currentUser').merge(payload);
      return state
        .set('currentUser', newUser)
        .set('error', '');

    case LOGOUT_ERROR:
    case UPDATE_CURRENT_USER_ERROR:
      return state
        .set('error', payload);

    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case FETCH_CURRENT_USER_ERROR:
      return state
        .set('currentUser', null)
        .set('error', payload);

    default:
      return state;
  }
};

export default sessionReducer;
