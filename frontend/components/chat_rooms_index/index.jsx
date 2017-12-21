import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

import { fetchChatRooms, joinChat } from 'reducers/chatroom_reducer';
import { chatroomSelector, currentUserSelector } from 'reducers/selectors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin: 40px auto 0 auto;
`
const ChatRoomButton = styled.button`
  width: 25%;
  height: 100px;
  text-align: center;
  color: ghostwhite;
  border: solid 1px ghostwhite;
  margin: 20px 0;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

class ChatRoomIndex extends React.Component {

  componentWillMount() {
    console.log('fetching rooms');
    this.props.fetchChatRooms();
  }

  handleClick = e => {
    const data =  {
      username: this.props.currentUser.get('username'),
      chatroom: e.target.value,
    };
    this.props.joinChat(data);
  }

  render() {
    console.log('CHATROOMINDEX', this.props.match.url);
    const chatrooms = this.props.chatrooms.map( cr => ( 
       <ChatRoomButton key={cr.title} onClick={this.handleClick} value={cr.title}>{cr.title}</ChatRoomButton>
    ));
    return !!this.props.currentUser ? (
      <Container>
        { chatrooms }
      </Container>
    ) : null;
  }
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  chatrooms: chatroomSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChatRooms: () => dispatch(fetchChatRooms()),
  redirectToChatroom: cr => dispatch(push(`/${cr}`)),
  joinChat: data => dispatch(joinChat(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoomIndex));
