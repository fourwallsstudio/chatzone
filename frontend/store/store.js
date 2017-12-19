import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from 'reducers/root_reducer'

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger)
  )
  return store;
}

export default configureStore;
