import { Map, List } from 'immutable';
import axios from 'axios';

export const CREATE_MESSAGE_REQUEST = 'MESSAGE::CREATE_MESSAGE_REQUEST';
export const RECEIVE_NEW_MESSAGE = 'MESSAGE::RECEIVE_NEW_MESSAGE'; 
export const FETCH_MESSAGES_REQUEST = 'MESSAGE::FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'MESSAGE::FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'MESSAGE::FETCH_MESSAGES_ERROR';

export const createMessage = msg => ({ type: CREATE_MESSAGE_REQUEST, msg });
export const fetchMessages = (chatroom, page) => ({
  type: FETCH_MESSAGES_REQUEST,
  chatroom,
  page
});

const defaultState = new Map({ 
  entities: new Map(),
  ids: new List(),
  error: '',
});

const messageReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    
    case RECEIVE_NEW_MESSAGE: {
      const newIds = state.get('ids').push(payload.id);
      return state
        .setIn(['entities', payload.id.toString()], new Map(payload))
        .set('ids', newIds);
    }
     
    case FETCH_MESSAGES_SUCCESS: {
      const payloadIds = payload.map( m => m.id )
      state.get('ids').forEach( id => {
        if (!payloadIds.includes(id)) payloadIds.push(id);
      })
      const sorted = payloadIds.sort( (a, b) => a - b ); 
      
      const payloadEnts = {}
      payload.forEach( m => payloadEnts[m.id] = m );
      const newEnts = state.get('entities').merge(payloadEnts)
      
      return state
        .set('entities', newEnts)
        .set('ids', new List(sorted));
    }
    
    case FETCH_MESSAGES_ERROR: 
      return state.set('error', payload)
        

    default:
      return state;
  }
} 

export default messageReducer;


