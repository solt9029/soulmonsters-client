import { takeEvery } from 'redux-saga/effects';
import * as userActions from '../actions/user';
import { login, logout } from './user';

export default function* rootSaga() {
  yield takeEvery(userActions.login.started.type, login);
  yield takeEvery(userActions.logout.started.type, logout);
}
