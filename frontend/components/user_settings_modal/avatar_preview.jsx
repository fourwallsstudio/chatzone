import React from 'react';
import styled from 'styled-components';

const PreviewBox = styled.div`
  width: 200px;
  height: 200px;
  background: pink;
  margin: 0 auto;
  overflow: hidden;
`;

const Img = styled.img`
  width: auto;
  height: 100%;
`

const AvatarPreview = props => (
  <PreviewBox>
    { props.src && <Img src={ props.src } /> }
  </PreviewBox>
)

export default AvatarPreview;
