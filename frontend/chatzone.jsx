import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

document.addEventListener('DOMContentLoaded', () => {
  const history = createHistory();
  const store = configureStore(history);
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} history={history} />, root);
})
