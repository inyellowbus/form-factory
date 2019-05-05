import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import makeRootReducer from './reducers';

const createStore = (initialState = {}) => {
  const middleware = [thunk];

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(...middleware),
  );
  store.asyncReducers = {};

  return store;
};

export default createStore;
