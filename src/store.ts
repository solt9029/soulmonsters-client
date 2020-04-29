import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import * as reducers from './reducers';

export interface AppState {
  user: any;
  router: any;
}

export const history = createBrowserHistory();

// middlewares
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

const combinedReducer = combineReducers<AppState>({
  ...reducers,
  router: connectRouter(history),
});

const store = createStore(combinedReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
