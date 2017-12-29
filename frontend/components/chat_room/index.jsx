import React from 'react';
import { reset } from 'redux-form';
import styled from 'styled-components';
import Observer from 'react-intersection-observer';
import { connect } from 'react-redux';
import { 
  currentChatSelector, 
  currentUserSelector, 
  chatMembersSelector,
  messageSelector,
} from 'reducers/selectors';
import { leaveChat, fetchMembers } from 'reducers/chatroom_reducer';
import { 
  createMessage,
  fetchMessages,
} from 'reducers/message_reducer';

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 99%;
  max-height: 99%;
  width: 80%;
  margin-left: 10px;
  box-sizing: border-box;
`

const Button = styled.button`
  position: absolute;
  top: 0;
  background: pink;
  height: 24px;    
  width: 100%;
  text-align: center;
  color: ghostwhite;
  margin-bottom: 10px;
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

const MessagesEnd = styled.div`
  float: left;
  clear: both;
`

const NotesContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 50px;
  left: 10px;
  width: 100%;
  overflow: hiddin;
`
const Note = styled.div`
  background: pink;
  border-radis: 100%;
  width: 10px;
  height: 10px;
  filter: blur(2px);
  margin-right: 4px;
`

class ChatRoom extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      scroll: false,
      notifications: [],
      inView: true,
    }
  }

  componentDidMount() {
    this.props.fetchMembers(this.props.currentChat.get('chatroom'))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.size > this.props.messages.size
        && this.msgEnd.offsetTop >= this.msgDisplay.clientHeight
        && !this.state.scroll) {
      
      const newNotes = Object.assign([], this.state.notifications);
      newNotes.push('n')
      this.setState({ notifications: newNotes });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.messages.equals(prevProps.messages)
      && this.state.scroll ) {
        this.scrollToBottom();
    }
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
    const { currentUser, currentChat, createMessage, reset } = this.props;
    const msg = {
      body: values.get('message'),
      author: currentUser.get('username'),
      userId: currentUser.get('id'),
      chatroom: currentChat.get('chatroom'),
      chatroomId: currentChat.get('id'),
    }
    createMessage(msg); 
    reset('message'); // clear form input field
    
    // activate for scroll down when component is updated with new msg
    this.setState({ scroll: true });
  }

  handleFetchMsgs = () => {
    const page = Math.floor(this.props.messages.size / 20) + 1;
    const chatroom = this.props.currentChat.get('chatroom');
    this.props.fetchMessages(chatroom, page);
  }

  scrollToBottom = () => {
    this.msgEnd.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    this.setState({ scroll: false });
  }

  handleClearNotifications = (inView) => {
    if (inView) {
      this.setState({ notifications: [], inView: true }); 
    } else {
      this.setState({ inView: false });
    }
  }

  setRef = (element) => {
    this.msgDisplay = element;
  }

  render() {
    const { currentUser, currentChat, members, messages } = this.props;
    const validChat = !!currentUser && !currentChat.isEmpty();
    const membersJS = members.toJS(); 
    const notes = this.state.notifications.map( (n, i) => <Note key={i} />);
    
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
          <Button onClick={ this.handleFetchMsgs } >
            load previous messages
          </Button>
          <ChatDisplay 
            currentUser={ currentUser } 
            messages={ messages }
            setRef={ this.setRef }
            handleFetchMsgs={ this.handleFetchMsgs }>
            <Observer onChange={ inView => this.handleClearNotifications(inView) }>
              <div ref={ el => this.msgEnd = el } style={{ float: 'left', clear: 'both' }}></div>
            </Observer>
          </ChatDisplay>
          <NotesContainer>{ notes }</NotesContainer>
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
  reset: form => dispatch(reset(form)),
  fetchMessages: (cr, pg) => dispatch(fetchMessages(cr, pg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
