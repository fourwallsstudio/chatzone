import React from 'react';
import styled from 'styled-components';

const ImgBox = styled.div`
  width: ${ p => p.scale }px;  
  height: ${ p => p.scale }px;  
  color: white;
  text-align: center;
  line-height: ${ p => p.scale }px;  
  background: pink;
  overflow: hidden;

  &:hover {
    cursor: ${ p => p.isButton ? 'pointer' : '' };
  }
`;

const Img = styled.img`
  width: auto;
  height: 100%;
`;

const Avatar = props => (
  <ImgBox 
    scale={ props.scale } 
    isButton={ props.isButton }
    onClick={ props.toggleModal }>
    { props.src && <Img src={ props.src } /> }
  </ImgBox>
);

export default Avatar;
