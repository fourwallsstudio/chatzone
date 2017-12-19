import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from 'reducers/root_reducer'
import rootSaga from 'sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
