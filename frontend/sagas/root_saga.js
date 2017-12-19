import { all } from 'redux-saga/effects';
import { loginFlow, signupFlow } from 'sagas/session_saga';  

export default function* rootSaga() {
  yield all([
    loginFlow(),
    signupFlow(),
  ]);
};
