import { Map, List } from 'immutable';

export const FETCH_CHATROOMS_REQUEST = 'CHATROOM::FETCH_CHATROOMS_REQUEST';
export const FETCH_CHATROOMS_SUCCESS = 'CHATROOM::FETCH_CHATROOMS_SUCCESS';
export const FETCH_CHATROOMS_ERROR = 'CHATROOM::FETCH_CHATROOMS_ERROR';
export const JOIN_CHAT = 'CHATROOM::JOIN_CHAT';
export const LEAVE_CHAT = 'CHATROOM::LEAVE_CHAT';
export const UPDATE_CURRENT_CHAT = 'CHATROOM::UPDATE_CURRENT_CHAT'; 
export const ADD_CHAT_MEMBER = 'CHATROOM::ADD_CHAT_MEMBER';
export const REMOVE_CHAT_MEMBER = 'CHATROOM::REMOVE_CHAT_MEMBER';
export const FETCH_MEMBERS_REQUEST = 'CHATROOM::FETCH_MEMBERS_REQUEST';
export const FETCH_MEMBERS_SUCCESS = 'CHATROOM::FETCH_MEMBERS_SUCCESS';
export const FETCH_MEMBERS_ERROR = 'CHATROOM::FETCH_MEMBERS_ERROR';

export const fetchChatRooms = () => ({ type: FETCH_CHATROOMS_REQUEST });
export const joinChat = joinData => ({ type: JOIN_CHAT, joinData });
export const leaveChat = leaveData => ({ type: LEAVE_CHAT, leaveData });
export const fetchMembers = chatroom => ({ type: FETCH_MEMBERS_REQUEST, chatroom });

const defaultState = new Map({
  chatrooms: new List(),
  currentChat: null,
  members: new List(),
  error: '',
})

const chatroomReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_CHATROOMS_SUCCESS:
      return state  
        .set('chatrooms', new List(payload))
        .set('error', '');
    
    case UPDATE_CURRENT_CHAT: {
      const members = payload ? state.get('members') : new List();
      return state
        .set('currentChat', payload)
        .set('members', members);
    }

    case ADD_CHAT_MEMBER: {
      const newMembers = state.get('members').push(payload.username);
      return state
        .set('members', newMembers);
    }
        
    case REMOVE_CHAT_MEMBER: {
      const newMembers = state.get('members').filter( m => m !== payload.username );
      console.log('REMOVE_CHAT', newMembers, 'payload', payload);
      return state
        .set('members', newMembers);
    }

    case FETCH_MEMBERS_SUCCESS: 
      return state
        .set('members', new List(payload));
    
    case FETCH_MEMBERS_ERROR:
    case FETCH_CHATROOMS_ERROR:
      return state
        .set('error', payload);

    default:
      return state; 
  }
};

export default chatroomReducer;
