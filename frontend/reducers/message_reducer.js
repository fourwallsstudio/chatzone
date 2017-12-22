import { Map, List } from 'immutable';
import axios from 'axios';

export const CREATE_MESSAGE_REQUEST = 'MESSAGE::CREATE_MESSAGE_REQUEST';
export const RECEIVE_NEW_MESSAGE = 'MESSAGE::RECEIVE_NEW_MESSAGE'; 

export const createMessage = msg => ({ type: CREATE_MESSAGE_REQUEST, msg });

const defaultState = new Map({ 
  entities: new Map(),
  ids: new List(),
});

const messageReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    
    case RECEIVE_NEW_MESSAGE:
      const newIds = state.get('ids').push(payload.id);
      return state
        .setIn(['entities', payload.id], new Map(payload))
        .set('ids', newIds);

    default:
      return state;
  }
} 

export default messageReducer;
