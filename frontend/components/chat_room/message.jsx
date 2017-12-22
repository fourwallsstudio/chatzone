import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 10px;
  max-width: 100%;
  justify-content: ${ p => p.right ? 'flex-end' : 'flex-start' };
  box-sizing: border-box;
`
const BG = styled.div`
  display: flex;
  background: ${ p => p.right ? 'black' : 'lightgrey' };
  color: ${ p => p.right ? 'ghostwhite' : 'black' };
  max-width: 50%;
  padding: 0 10px;
`

const P = styled.p`
  font-size: 16px;
  line-height: 20px;
  word-wrap: break-word;
  max-width: 100%;
 ${ p => p.f ? 'margin-right: 10px;' : '' }
`

const Message = props => (
  <Container right={ props.right } >
    <BG right={ props.right } >
      { !props.right && <P f={ true } >{ `${ props.msg.author }:` }</P> }
      <P>{ props.msg.body }</P>
    </BG>
  </Container>
)

export default Message;
