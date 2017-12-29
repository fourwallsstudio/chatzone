import { Map } from 'immutable';

const UPDATE_SESSION_FORM_TYPE = 'UI::UPDATE_SESSION_FORM_TYPE';
const TOGGLE_SETTINGS_MODAL = 'UI::TOGGLE_SETTINGS_MODAL';

export const updateSessionFormType = formType => ({ type: UPDATE_SESSION_FORM_TYPE, payload: formType });
export const toggleSettingsModal = () => ({ type: TOGGLE_SETTINGS_MODAL });

const defaultState = Map({
  sessionFormType: 'login',
  settingsModalActive: false,
});

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {

    case UPDATE_SESSION_FORM_TYPE:
      return state
        .set('sessionFormType', action.payload);

    case TOGGLE_SETTINGS_MODAL:
      return state
        .set('settingsModalActive', !state.get('settingsModalActive'));

    default: 
      return state;
  }
};

export default uiReducer;
