import React from 'react';
import styled from  'styled-components';

const BackgroundImg = styled.div`
  position: absolute; 
  top: -10px;  
  left: -10px;
  z-index: -1; 
  background-image: url('static/images/2950.jpg'); 
  filter: blur(5px); 
  width: 110vw; 
  height: 110vh;
  padding: 20 
`
const Background = () => <BackgroundImg />;

export default Background; 
