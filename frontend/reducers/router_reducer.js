import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux'; 

const defaultState = fromJS({
  loctionBeforeTransitions: null
});

const routerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOCATION_CHANGE:
      return state.merge({ locationBeforeTransitions: payload });

    default:
      return state;
  }
};

export default routerReducer;
