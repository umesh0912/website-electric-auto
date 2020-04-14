import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';
import Router from './router';
import './scss/main.scss';
import { AUTH_USER } from './actions/types';
import { getFromCookie } from './credentials/access_credentials';

const token = getFromCookie('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router />
    </Provider>
  </div>,
  document.getElementById('app')
);
