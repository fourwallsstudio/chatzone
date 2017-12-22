import React from 'react';
import App from './app';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const Root = ({ store, history }) => {
  return (
    <Provider store={ store }>
      <ConnectedRouter history={ history } >
        <App />
      </ConnectedRouter>
    </Provider>
  )
}

export default Root;
