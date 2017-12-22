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
  background: ${ p => p.right ? 'black' : 'lightgrey' };
  color: ${ p => p.right ? 'ghostwhite' : 'black' };
  max-width: 60%;
  padding: 4px 10px;
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
      { 
        !props.right && 
        <P f={ true } 
          right={ props.right }>
          { `${ props.msg.author }:` }</P> 
      }
      <P>{ props.msg.body }</P>
    </BG>
  </Container>
)

export default Message;
