import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { chatroomSelector, currentUserSelector } from 'reducers/selectors';

const Container = styled.div`
  display: flex;
  color: ghostwhite;
`

class ChatRoom extends React.Component {

  socket = io('http://localhost:5000');

  componentDidMount() {
   /* const data = JSON.stringify({ 
      username: this.props.currentUser.username, 
      room: this.props.chatroom,
    });
    this.socket.emit('join', data);
    this.socket.on('message', data => console.log('msg: ', data));
    */
  }

  componentWillUnmount() {
   /* const data = JSON.stringify({ 
      username: this.props.currentUser.username, 
      room: this.props.chatroom,
    });
    this.socket.emit('leave', data);
    */
  }

  render() {
    const validChat = this.props.chatrooms.includes(this.props.chatroom) 
      && !!this.props.currentUser;
   
      return validChat ? (
      <Container>
        { this.props.chatroom }
      </Container>
    ) : null;
  }
};

const mapStateToProps = (state, { match }) => ({
  currentUser: currentUserSelector(state),
  chatrooms: chatroomSelector(state),
  chatroom: match.url.split('/')[1],
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoom));
