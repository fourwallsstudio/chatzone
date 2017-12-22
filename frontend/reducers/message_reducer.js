import { Map } from 'immutable';
import axios from 'axios';

export const CREATE_MESSAGE_REQUEST = 'MESSAGE::CREATE_MESSAGE_REQUEST';
export const RECEIVE_NEW_MESSAGE = 'MESSAGE::RECEIVE_NEW_MESSAGE'; 

export const createMessage = msg => ({ type: CREATE_MESSAGE_REQUEST, msg });

const defaultState = new Map({ 
  entities: new Map(),
});

const messageReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    
    case RECEIVE_NEW_MESSAGE:
      return state
        .setIn(['entities', payload.id], new Map(payload))

    default:
      return state;
  }
} 

export default messageReducer;
