/* global __DEVTOOLS__ */
import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import history from './history';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import combinedReducer from '../reducers/index';

let combinedCreateStore;
const storeEnhancers = [
  reduxReactRouter({ history }),
];

if (__DEVTOOLS__) {
  const DevTools = require('../components/DevTools');
  storeEnhancers.push(DevTools.instrument());
}

combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore);

export default (initialState) => {

  const store = finalCreateStore(combinedReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
