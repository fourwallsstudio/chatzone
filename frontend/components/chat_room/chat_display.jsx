import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Message from './message';

import style from './index.scss';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={100}
    classNames="fade"
  >
  { children }
  </CSSTransition>
)

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
      <Fade key={ `${i}: ${msg.get('id')}` }>
        <Message 
          right={ right } 
          msg={ msg.toJS() }
          />
      </Fade>
    )
  })

  return messages;
}

const ChatDisplay = props => {
  return (
    <Container innerRef={ props.setRef }>
      <TransitionGroup className='messages'>
        { renderMessages(props) }      
      </TransitionGroup>
      { props.children }
    </Container>
  )
}

export default ChatDisplay;
