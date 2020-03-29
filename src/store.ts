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

// reducers
const combinedReducers = combineReducers<AppState>({
  ...reducers,
  router: connectRouter(history),
});

const store = createStore(combinedReducers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
