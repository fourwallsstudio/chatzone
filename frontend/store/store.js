import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers/root_reducer'
import rootSaga from 'sagas/root_saga';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware ];
let composeEnhansers = compose;

if (process.env.NODE_ENV !== 'production') {
  console.log('dev mode bb');
  const logger = createLogger({
    predicate: (getState, action) => !action.type.match(/redux-form/)
  });
  middlewares.push(logger);
  composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = (history) => {
  const enhancer = composeEnhansers(
    applyMiddleware(...middlewares, routerMiddleware(history))
  )
  const store = createStore(
    rootReducer,
    enhancer
  )
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
