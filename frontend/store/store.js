import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers/root_reducer'
import rootSaga from 'sagas/root_saga';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware ];

if (process.env.NODE_ENV !== 'production') {
  console.log('dev mode bb');
  const logger = createLogger({
    predicate: (getState, action) => !action.type.match(/redux-form/)
  });
  middlewares.push(logger);
}

const configureStore = (history) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares, routerMiddleware(history))
  )
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
