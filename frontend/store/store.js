import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers/root_reducer'
import rootSaga from 'sagas/root_saga';
import { routerMiddleware } from 'react-router-redux';

const logger = createLogger({
  predicate: (getState, action) => !action.type.match(/redux-form/)
});

const sagaMiddleware = createSagaMiddleware();

const configureStore = (history) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware, routerMiddleware(history))
  )
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
