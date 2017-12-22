import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
  currentChatSelector, 
  currentUserSelector, 
  chatMembersSelector,
} from 'reducers/selectors';
import { leaveChat, fetchMembers } from 'reducers/chatroom_reducer';

import MembersAside from './members_aside';

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

const BackButton = styled.button`
  color: ghostwhite;
  width: 100%;
  text-align: center;
  border: solid 1px ghostwhite;
  margin-bottom: 10px;
  padding: 10px 0;
`

class ChatRoom extends React.Component {

  componentDidMount() {
    this.props.fetchMembers(this.props.currentChat)
  }

  handleBack = () => {
    const { leaveChat, currentUser, currentChat } = this.props;
    const data = { 
      chatroom: currentChat, 
      username: currentUser.get('username') 
    };
    leaveChat(data);
  }

  render() {
    const { currentUser, currentChat, members } = this.props;
    const validChat = !!currentUser && !!currentChat;
    const membersJS = members.toJS(); 
    
    return validChat ? (
      <Container>
        <Aside>
          <BackButton onClick={ this.handleBack }>back to the zones</BackButton>
          <MembersAside 
            currentUser={currentUser.toJS()}
            members={membersJS} 
            chatroom={currentChat} /> 
        </Aside>
      </Container>
    ) : null;
  }
};

const mapStateToProps = (state, { match }) => ({
  currentUser: currentUserSelector(state),
  currentChat: currentChatSelector(state),
  members: chatMembersSelector(state),
});

const mapDispatchToProps = dispatch => ({
  leaveChat: data => dispatch(leaveChat(data)),
  fetchMembers: cr => dispatch(fetchMembers(cr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
