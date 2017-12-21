import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchChatRooms } from 'reducers/chatroom_reducer';
import { chatroomSelector, currentUserSelector } from 'reducers/selectors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
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
    console.log('on click: ', e.target.value);
  }

  render() {
    const cu = this.props.currentUser;
    const chatrooms = this.props.chatrooms.map( cr => ( 
       <ChatRoomButton key={`${cr.id}: ${cr.title}`} onClick={this.handleClick} value={cr.title}>{cr.title}</ChatRoomButton>
    ));
    return (
      <Container>
        { chatrooms }
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  chatrooms: chatroomSelector(state),
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChatRooms: () => dispatch(fetchChatRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomIndex);
