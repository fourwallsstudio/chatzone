import React from 'react';
import styled, { keyframes } from  'styled-components';

const throb = keyframes`
  from {
    transform: scale(1, 1);
  }

  to {
    transform: scale(1.2, 1.2);
  }
`

const BackgroundImg = styled.div`
  position: absolute; 
  top: -10px;  
  left: -10px;
  z-index: -1; 
  background-image: url('static/images/2950.jpg'); 
  filter: blur(5px); 
  width: 110vw; 
  height: 110vh;
  animation-name: ${throb};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
`
const Background = () => <BackgroundImg />;

export default Background; 
