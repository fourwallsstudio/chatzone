import React from 'react';
import styled from 'styled-components';
import Message from './message';

const Container = styled.div`
  border: solid 1px ghostwhite;
  height: 100%;
  max-width: 100%;
  overflow-y: scroll;
  padding-top: 24px;
`

const renderMessages = props => {
  const messages = [];

  props.messages.forEach( (msg, i) => {
    const right = msg.get('author') === props.currentUser.get('username');
    messages.push(
      <Message 
        key={ `${i}: ${msg.get('id')}` }
        right={ right } 
        msg={ msg.toJS() }
        />
    )
  })

  return messages;
}

const ChatDisplay = props => {
  return (
    <Container>
      { renderMessages(props) }      
      { props.children }
    </Container>
  )
}

export default ChatDisplay;
