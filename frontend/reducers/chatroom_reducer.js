import { Map, List } from 'immutable';

export const FETCH_CHATROOMS_REQUEST = 'CHATROOM::FETCH_CHATROOMS_REQUEST';
export const FETCH_CHATROOMS_SUCCESS = 'CHATROOM::FETCH_CHATROOMS_SUCCESS';
export const FETCH_CHATROOMS_ERROR = 'CHATROOM::FETCH_CHATROOMS_ERROR';

export const fetchChatRooms = () => ({ type: FETCH_CHATROOMS_REQUEST });

const defaultState = new Map({
  chatrooms: new List(),
  error: '',
})

const chatroomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CHATROOMS_SUCCESS:
      console.log('cr reducer success', action.payload)
      return state  
        .set('chatrooms', new List(action.payload))
        .set('error', '');
    
    case FETCH_CHATROOMS_ERROR:
      return state
        .set('error', action.payload);

    default:
      return state; 
  }
};

export default chatroomReducer;
