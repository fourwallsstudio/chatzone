import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/title';
import ChatRoomIndex from '../chat_rooms_index';
import ChatRoom from '../chat_room';
import { logout, fetchCurrentUser } from 'reducers/session_reducer';
import { leaveChat } from 'reducers/chatroom_reducer';
import { currentUserSelector, currentChatSelector } from 'reducers/selectors';
import { getAuthTokenFromLocalStorage } from '../../util/session_util';

const Container = styled.div`
  width: 80%;
  margin: 100px auto 0 auto;
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  margin-top: 10px;
`
const Welcome = styled.div`
  font-size: 16px; 
  color: ghostwhite;
  margin-right: 10px;
`
const LogoutButton = styled.button`
  color: ghostwhite;
  border: solid 1px ghostwhite;
  padding: 6px 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

class Home extends React.Component {

  componentWillMount() {
    if (this.props.authToken) this.props.fetchCurrentUser();
  }

  handleLogout = () => {
    const { currentChat, currentUser, logout, leaveChat } = this.props;
    
    if (currentChat) leaveChat({ username: currentUser.get('username'), chatroom: currentChat.get('title') });
    const id = currentUser.get('id');
    logout(id);
  }

  render() {
    const { currentUser, currentChat, path } = this.props;
    const pathAtIndex = path === '/';
    const chatPath = currentChat && `/${currentChat.get('chatroom')}`; 
    
    return !!currentUser ? (
      <Container>
        <Header>
          <Welcome>{ `Welcome ${ currentUser.get('username') }` }</Welcome>
          <LogoutButton onClick={ this.handleLogout }>logout</LogoutButton>
        </Header>
        <Title />
        { pathAtIndex && <ChatRoomIndex /> }
        { chatPath === path && <ChatRoom /> }
      </Container>
    ) : null;
  }
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  authToken: getAuthTokenFromLocalStorage(),
  currentChat: currentChatSelector(state),
  path: state.get('routing').location.pathname,
});

const mapDispatchToProps = dispatch => ({
  logout: id => dispatch(logout(id)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  leaveChat: data => dispatch(leaveChat(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
