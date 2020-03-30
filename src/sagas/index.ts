import { takeEvery, put } from 'redux-saga/effects';
import { login as loginAction } from '../actions/user';
import { login } from './user';
import { send } from '@giantmachines/redux-websocket';

export default function* rootSaga() {
  yield takeEvery(loginAction.started.type, login);
  yield takeEvery('REDUX_WEBSOCKET::OPEN', handleOpen);
}

function* handleOpen() {
  yield put(send({ test: 'test' }));
}
