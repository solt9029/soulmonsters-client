import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export interface AppState {
  router: any;
}

export const history = createBrowserHistory();

// middlewares
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// reducers
const combinedReducers = combineReducers<AppState>({
  router: connectRouter(history),
});

const store = createStore(combinedReducers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
