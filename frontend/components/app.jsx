import React from 'react';
import { Route } from 'react-router-dom';
import Landing from 'components/landing';
import Background from 'components/background';
import Home from 'components/home';
import ChatRoom from 'components/chat_room';
import ChatRoomIndex from 'components/chat_rooms_index';

const App = () => (
  <section id="app-container" > 
    <Background />
    <Landing />
    <Home />
    <Route exact path='/' component={ ChatRoomIndex } />
    <Route exact path='/:chatroom' component={ ChatRoom } />
  </section>
)

export default App;
