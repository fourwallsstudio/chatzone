import { createSelector } from 'reselect';
const Identicon = require('identicon.js');

export const currentUserSelector = state => state.getIn(['session', 'currentUser'], '');

export const sessionFormTypeSelector = state => state.getIn(['ui', 'sessionFormType'], '');

export const chatroomSelector = state => state.getIn(['chatroom', 'chatrooms'], '');

export const currentChatSelector = state => state.getIn(['chatroom', 'currentChat'], '');

export const chatMembersSelector = state => state.getIn(['chatroom', 'members'], null);

export const messagesSelector = state => state.getIn(['messages', 'entities']);

const getMessages = state => state.getIn(['messages', 'entities']);

const getMsgIds = state => state.getIn(['messages', 'ids']);

export const messageSelector = createSelector(
  getMessages,
  getMsgIds,
  currentChatSelector,
  (msgs, ids, chat) => (
    ids.map( id => msgs.get(id.toString()))
      .filter( m => m.get('chatroom') === chat.get('chatroom'))
  )
);
  
export const sessionErrorSelector = state => {
  const error = state.getIn(['session', 'error']);
  if (error === 'Incorrect password'
    || error === 'User does not exist'
    || error === 'Username already exists') {

    return error;
  }
  return '';
}

export const avatarSelector = (state, member) => {
  let username; 
  
  if (state) {
    const avatar = state.getIn(['session', 'currentUser', 'avatar'])
    if (avatar) return avatar; 
    username = state.getIn(['session', 'currentUser', 'username'])
  } else if (member) {
    username = member; 
  }

  const hash = btoa(username);
  const options = {
    forground: [0, 0, 0, 255],
    background: [255, 255, 255, 255],
    size: 200,
    format: 'svg',
  };
  const data = new Identicon(hash + hash, options).toString();
  const src = `data:image/svg+xml;base64, ${data}`;

  return src;
}
