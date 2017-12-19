import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 620px;
`
const Text = styled.h1`
  color: ghostwhite;
  font-size: 56px;
  line-height: 40px;
  font-style: italic;
  margin-right: 5px;
`
const Block = styled.div`
  background-color: ghostwhite;
  height: 40px;
  width: 300px;
`

const Title = () => (
  <Container>
    <Text>CHATZONE</Text>
    <Block />
  </Container>
)

export default Title;
