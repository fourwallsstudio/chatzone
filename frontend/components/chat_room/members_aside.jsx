import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: solid 1px ghostwhite;
  overflow: hidden;
  height: 100%;
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

const MembersAside = ({ members, currentUser, chatroom }) => {
  const membersWithoutCurrentUser = members.filter( m => m !== currentUser.username );
  const memberEls = membersWithoutCurrentUser.map((m, i) => <Member key={`${i} ${m}`}>{m}</Member> );

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
