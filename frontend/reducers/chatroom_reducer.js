import { Map, List, fromJS } from 'immutable';

export const FETCH_CHATROOMS_REQUEST = 'CHATROOM::FETCH_CHATROOMS_REQUEST';
export const FETCH_CHATROOMS_SUCCESS = 'CHATROOM::FETCH_CHATROOMS_SUCCESS';
export const FETCH_CHATROOMS_ERROR = 'CHATROOM::FETCH_CHATROOMS_ERROR';
export const CONNECT_TO_SOCKET = 'CHATROOM::CONNECT_TO_SOCKET';
export const JOIN_CHAT = 'CHATROOM::JOIN_CHAT';
export const LEAVE_CHAT = 'CHATROOM::LEAVE_CHAT';
export const UPDATE_CURRENT_CHAT = 'CHATROOM::UPDATE_CURRENT_CHAT'; 
export const ADD_CHAT_MEMBER = 'CHATROOM::ADD_CHAT_MEMBER';
export const REMOVE_CHAT_MEMBER = 'CHATROOM::REMOVE_CHAT_MEMBER';
export const FETCH_MEMBERS_REQUEST = 'CHATROOM::FETCH_MEMBERS_REQUEST';
export const FETCH_MEMBERS_SUCCESS = 'CHATROOM::FETCH_MEMBERS_SUCCESS';
export const FETCH_MEMBERS_ERROR = 'CHATROOM::FETCH_MEMBERS_ERROR';

export const fetchChatRooms = () => ({ type: FETCH_CHATROOMS_REQUEST });
export const connectToSocket = () => ({ type: CONNECT_TO_SOCKET });
export const joinChat = joinData => ({ type: JOIN_CHAT, joinData });
export const leaveChat = leaveData => ({ type: LEAVE_CHAT, leaveData });
export const fetchMembers = chatroom => ({ type: FETCH_MEMBERS_REQUEST, chatroom });

const defaultState = new Map({
  chatrooms: new Map(),
  currentChat: null,
  members: new List(),
  error: '',
})

const chatroomReducer = (state = defaultState, { type, payload }) => {
  switch (type) {

    case FETCH_CHATROOMS_SUCCESS: {
      const chatrooms = {} 
      payload.forEach(cr => chatrooms[cr.id] = cr )
      return state  
        .set('chatrooms', fromJS(chatrooms))
        .set('error', '');
    }
    
    case UPDATE_CURRENT_CHAT: {
      const members = payload ? state.get('members') : new List();
      return state
        .set('currentChat', new Map(payload))
        .set('members', members)
    }

    case ADD_CHAT_MEMBER: {
      const newMembers = state.get('members').includes(payload) 
        ? state.get('members')
        : state.get('members').push(payload);
      return state
        .set('members', newMembers);
    }
        
    case REMOVE_CHAT_MEMBER: {
      const newMembers = state.get('members').filter( m => m !== payload);
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
