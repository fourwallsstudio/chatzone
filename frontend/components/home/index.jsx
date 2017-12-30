import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/title';
import ChatRoomIndex from '../chat_rooms_index';
import ChatRoom from '../chat_room';
import UserSettingsModal from '../user_settings_modal';
import Avatar from '../avatar';
import { logout, fetchCurrentUser } from 'reducers/session_reducer';
import { connectToSocket, leaveChat } from 'reducers/chatroom_reducer';
import { 
  currentUserSelector, 
  currentChatSelector, 
  avatarSelector 
} from 'reducers/selectors';
import { toggleSettingsModal } from 'reducers/ui_reducer';
import { getAuthTokenFromLocalStorage } from '../../util/session_util';

const Container = styled.div`
  width: 80%;
  min-width: 500px;
  margin: 100px auto 0 auto;
`
const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`
const Welcome = styled.div`
  font-size: 16px; 
  height: 35px;
  line-height: 35px;
  color: ghostwhite;
  margin: 0 10px;
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser) {
      this.props.connectToSocket();
    }
  }

  handleLogout = () => {
    const { currentChat, currentUser, logout, leaveChat } = this.props;
    
    if (currentChat) leaveChat({ username: currentUser.get('username'), chatroom: currentChat.get('title') });
    const id = currentUser.get('id');
    logout(id);
  }

  handleToggleModal = () => {
    this.props.toggleSettingsModal();
  }

  render() {
    const { currentUser, currentChat, path, avatarSrc } = this.props;
    const pathAtIndex = path === '/';
    const chatPath = currentChat && `/${currentChat.get('chatroom')}`; 
    
    return !!currentUser ? (
      <Container>
        <Header>
          <Welcome>Welcome</Welcome>
          <Avatar 
            src={ avatarSrc }
            scale={ 35 } 
            isButton={ true }
            toggleModal={ this.handleToggleModal } />
          <Welcome>{ `${ currentUser.get('username') }` }</Welcome>
          <LogoutButton onClick={ this.handleLogout }>logout</LogoutButton>
          <UserSettingsModal toggleModal={ this.handleToggleModal } />
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
  avatarSrc: avatarSelector(state),
});

const mapDispatchToProps = dispatch => ({
  logout: id => dispatch(logout(id)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  connectToSocket: () => dispatch(connectToSocket()),
  leaveChat: data => dispatch(leaveChat(data)),
  toggleSettingsModal: () => dispatch(toggleSettingsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
