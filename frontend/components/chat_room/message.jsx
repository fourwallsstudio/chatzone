import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/avatar';
import { avatarSelector } from 'reducers/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  margin-bottom: 10px;
  max-width: 100%;
  align-items: ${ p => p.right ? 'flex-end' : 'flex-start' };
  box-sizing: border-box;
`
const BG = styled.div`
  background: ${ p => p.right ? 'black' : 'lightgrey' };
  color: ${ p => p.right ? 'ghostwhite' : 'black' };
  max-width: 60%;
  padding: 4px 10px;
`
const UserBox = styled.div`
  display: flex;
  align-items: baseline;
  color: white;
`

const P = styled.p`
  font-size: 16px;
  line-height: 20px;
  word-wrap: break-word;
  max-width: 100%; 
 ${ p => p.f ? 'margin: 0 10px;' : '' }
`

const Message = props => {
  const { right, msg } = props;
  const src = avatarSelector(null, msg.author);
  
  return (
    <Container right={ right } >
      { 
        !right && 
        <UserBox>
          <Avatar src={ src } scale={ 35 } />
          <P f={ true } 
            right={ right }>
            { `${ msg.author }:` }</P> 
        </UserBox>
      }
      <BG right={ right } >
        <P>{ msg.body }</P>
      </BG>
    </Container>
  )
}

export default Message;
