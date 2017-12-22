import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
  currentChatSelector, 
  currentUserSelector, 
  chatMembersSelector,
  messageSelector,
} from 'reducers/selectors';
import { leaveChat, fetchMembers } from 'reducers/chatroom_reducer';
import { createMessage } from 'reducers/message_reducer';

import MembersAside from './members_aside';
import ChatDisplay from './chat_display';
import MessageForm from './message_form';

const Container = styled.div`
  display: flex;
  height: 460px;
  border: solid 1px ghostwhite;
  margin: 40px auto 0 auto;
  padding: 10px;
  box-sizing: border-box;
`
const Aside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
`
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 99%;
  max-height: 99%;
  width: 80%;
  margin-left: 10px;
  box-sizing: border-box;
`

const BackButton = styled.button`
  color: ghostwhite;
  width: 100%;
  text-align: center;
  border: solid 1px ghostwhite;
  margin-bottom: 10px;
  padding: 10px 0;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

class ChatRoom extends React.Component {

  componentDidMount() {
    this.props.fetchMembers(this.props.currentChat.get('chatroom'))
  }

  handleBack = () => {
    const { leaveChat, currentUser, currentChat } = this.props;
    const data = { 
      chatroom: currentChat.get('chatroom'), 
      username: currentUser.get('username') 
    };
    leaveChat(data);
  }

  handleSubmit = values => {
    const { currentUser, currentChat, createMessage } = this.props;
    const msg = {
      body: values.get('message'),
      author: currentUser.get('username'),
      userId: currentUser.get('id'),
      chatroom: currentChat.get('chatroom'),
      chatroomId: currentChat.get('id'),
    }
    createMessage(msg); 
  }

  render() {
    const { currentUser, currentChat, members, messages } = this.props;
    const validChat = !!currentUser && !currentChat.isEmpty();
    const membersJS = members.toJS(); 
    
    return validChat ? (
      <Container>
        <Aside>
          <BackButton onClick={ this.handleBack }>back to the zones</BackButton>
          <MembersAside 
            currentUser={currentUser.toJS()}
            members={membersJS} 
            chatroom={currentChat.get('chatroom')} /> 
        </Aside>
        <ChatBox>
          <ChatDisplay currentUser={ currentUser } messages={ messages } />
          <MessageForm onSubmit={ this.handleSubmit } />
        </ChatBox>
      </Container>
    ) : null;
  }
};

const mapStateToProps = (state, { match }) => ({
  currentUser: currentUserSelector(state),
  currentChat: currentChatSelector(state),
  members: chatMembersSelector(state),
  messages: messageSelector(state),
});

const mapDispatchToProps = dispatch => ({
  leaveChat: data => dispatch(leaveChat(data)),
  fetchMembers: cr => dispatch(fetchMembers(cr)),
  createMessage: msg => dispatch(createMessage(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
