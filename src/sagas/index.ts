import { takeEvery } from 'redux-saga/effects';
import { login as loginAction } from '../actions/user';
import { login } from './user';

export default function* rootSaga() {
  yield takeEvery(loginAction.type, login);
}
