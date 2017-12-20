import React from 'react';
import io from 'socket.io-client';

class ChatRoom extends React.Component {

  socket = io('http://localhost:5000');

  componentDidMount() {
    const data = JSON.stringify({ 
      username: this.props.currentUser.username, 
      room: this.props.chatroom,
    });
    this.socket.emit('join', data);
    this.socket.on('message', data => console.log('msg: ', data));
  }

  componentWillUnmount() {
    const data = JSON.stringify({ 
      username: this.props.currentUser.username, 
      room: this.props.chatroom,
    });
    this.socket.emit('leave', data);
  }

  render() {
    return null;
  }
};

export default ChatRoom;
