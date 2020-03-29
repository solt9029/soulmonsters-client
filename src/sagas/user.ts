import * as actions from './../actions/user';
import { put, call } from 'redux-saga/effects';
import * as api from '../api/user';

export function* login() {
  try {
    const { user } = yield call(api.login);
    yield put(actions.login.done({ result: user }));
  } catch (error) {
    yield put(actions.login.failed({ error }));
  }
}
