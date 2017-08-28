"use strict"

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions';
import routes from './routes';

const middleware = applyMiddleware(thunk, createLogger());
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);
const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

render(
   Routes, document.getElementById('app')
  );

// store.dispatch(addToCart([{id:1}]));
