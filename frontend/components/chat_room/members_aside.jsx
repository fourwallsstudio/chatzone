import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/avatar';
import { avatarSelector } from 'reducers/selectors';

const Container = styled.div`
  border: solid 1px ghostwhite;
  overflow: hidden;
  height: 100%;
`

const MemberIndex = styled.div`
  height: 86%;
  padding: 10px;
`
const Member = styled.div`
  display: flex; 
  align-items: baseline;
  flex-wrap: wrap;  
  width: 100%;
`

const H2 = styled.h2`
  color: ghostwhite;
  font-size: 16px;
`

const Title = styled.h1`
  color: ghostwhite;
  font-size: 24px;
  text-align: center;
`

const MembersAside = props => {
  const { members, currentUser, chatroom } = props;
  const membersWithoutCurrentUser = members.filter( m => m !== currentUser.username );
  const memberEls = membersWithoutCurrentUser.map((m, i) => {
    const src = avatarSelector(null, m);
    return (
      <Member key={`${i} ${m}`}>
        <Avatar src={src} scale={ 35 } />
        <div style={{ width: 10 }} />
        <H2>{m}</H2>
      </Member> 
    )
  });

  return (
    <Container>
      <MemberIndex>
        { memberEls }
      </MemberIndex>
      <Title>{ chatroom }</Title>
    </Container>
  )
};

export default MembersAside;
