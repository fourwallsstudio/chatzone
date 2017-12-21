import { createSelector } from 'reselect';

export const currentUserSelector = state => state.getIn(['session', 'currentUser'], '');

export const sessionFormTypeSelector = state => state.getIn(['ui', 'sessionFormType'], '');

export const chatroomSelector = state => state.getIn(['chatroom', 'chatrooms'], '');

export const currentChatSelector = state => state.getIn(['chatroom', 'currentChat'], '');

export const chatMembersSelector = state => state.getIn(['chatroom', 'members'], null);
