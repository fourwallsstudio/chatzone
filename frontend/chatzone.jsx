import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const createSelectLocationState = reducerName => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return state => {
    const routingState = state.get(reducerName);
    console.log('routingState', routingState);

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const history = createHistory();
  const store = configureStore(history);
/*  
 *  const history = synchistorywithstore(
    browserhistory,
    store, 
    { selectlocationstate: createselectlocationstate('routing') } 
  );
*/
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} history={history} />, root);
})
