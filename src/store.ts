import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import * as reducers from './reducers';
import User from './models/User';
import DeckError from './models/DeckError';

export interface AppState {
  user: User;
  deckError: DeckError;
  selectedDeckId: string | null;
  router: any;
}

export const history = createBrowserHistory();

// middlewares
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// reducers
const persistConfig = {
  transforms: [immutableTransform({ records: [User] })],
  key: 'app',
  storage,
  whitelist: ['user', 'selectedDeckId'],
};
const combinedReducer = combineReducers<AppState>({
  ...reducers,
  router: connectRouter(history),
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
