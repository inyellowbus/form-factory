import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './redux/store/createStore';

import App from './app';


const initialState = {};

const store = createStore(initialState);
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    MOUNT_NODE,
  );
};

render();

export default store;
