import { Map } from 'immutable';

const UPDATE_SESSION_FORM_TYPE = 'UI::UPDATE_SESSION_FORM_TYPE';

export const updateSessionFormType = formType => ({ type: UPDATE_SESSION_FORM_TYPE, payload: formType });

const defaultState = Map({
  sessionFormType: 'login',
});

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {

    case UPDATE_SESSION_FORM_TYPE:
      return state
        .set('sessionFormType', action.payload);

    default: 
      return state;
  }
};

export default uiReducer;
