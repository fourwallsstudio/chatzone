import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 20%;
  border: solid 1px ghostwhite;
  overflow: hidden;
`

const MemberIndex = styled.div`
  height: 86%;
  padding: 10px;
`

const Member = styled.h2`
  color: ghostwhite;
  font-size: 16px;
`

const Title = styled.h1`
  color: ghostwhite;
  font-size: 24px;
  text-align: center;
`

const MembersAside = props => {
  const members = props.members.map( m => <Member key={m.username}>{m.username}</Member> );

  return (
    <Container>
      <MemberIndex>
        { members }
      </MemberIndex>
      <Title>{ props.chatroom }</Title>
    </Container>
  )
};

export default MembersAside;
