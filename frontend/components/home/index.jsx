import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Title from 'components/title';
import ChatRoomIndex from 'components/chat_rooms_index';
import { logout, fetchCurrentUser } from 'reducers/session_reducer';
import { currentUserSelector } from 'reducers/selectors';
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
`

class Home extends React.Component {

  componentWillMount() {
    if (this.props.authToken) this.props.fetchCurrentUser();
  }

  handleLogout = () => {
    const id = this.props.currentUser.get('id');
    this.props.logout(id);
  }

  render() {
    return !!this.props.currentUser ? (
      <Container>
        <Title />
        <Header>
          <Welcome>{ `Welcome ${ this.props.currentUser.get('username') }` }</Welcome>
          <LogoutButton onClick={ this.handleLogout }>logout</LogoutButton>
        </Header>
        <ChatRoomIndex />
      </Container>
    ) : null;
  }
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  authToken: getAuthTokenFromLocalStorage(),
});

const mapDispatchToProps = dispatch => ({
  logout: id => dispatch(logout(id)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
