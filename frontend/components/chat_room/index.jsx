import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
  currentChatSelector, 
  currentUserSelector, 
  chatMembersSelector,
} from 'reducers/selectors';

import MembersAside from './members_aside';

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 460px;
  border: solid 1px ghostwhite;
  margin: 40px auto 0 auto;
  padding: 10px;
`

class ChatRoom extends React.Component {

  render() {
    const validChat = !!this.props.currentUser && !!this.props.currentChat;
    const members = this.props.members.toJS();
    
    return validChat ? (
      <Container>
        <MembersAside 
          members={members} 
          chatroom={this.props.currentChat} /> 
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

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
