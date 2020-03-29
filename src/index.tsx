import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { initializeApp } from 'firebase';
import firebaseConfig from './config/firebase';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistStore(store)}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
