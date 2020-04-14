import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

declare let window: any;
// Build the middleware for intercepting and dispatching navigation actions
const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunkMiddleware];

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = (window && window.__PRELOADED_STATE__) || {};

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

if (process.env.NODE_ENV === 'development') {
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  rootReducer,
  preloadedState,
  process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./reducers', () =>
    store.replaceReducer(rootReducer)
  );
}

export default store;

//  HMR for reducers
// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
