import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 10px auto;
`
const Text = styled.h1`
  color: ghostwhite;
  font-size: 56px;
  line-height: 38px;
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  font-style: italic;
`
const Block = styled.div`
  background-color: ghostwhite;
  height: 42px;
  width: 100%;
  border-radius: 2px;
`

const Title = () => (
  <Container>
    <Text>CHATZONE</Text>
    <Block />
  </Container>
)

export default Title;
