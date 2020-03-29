import * as actions from './../actions/user';
import { put, call } from 'redux-saga/effects';
import * as api from '../api/user';

export function* login() {
  yield put(actions.login.started());
  const { user, error } = yield call(api.login);
  if (error) {
    yield put(actions.login.failed(error));
    return;
  }
  yield put(actions.login.done(user));
}
