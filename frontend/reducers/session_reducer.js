import { Map } from 'immutable';

const defaultState = new Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default sessionReducer;
