"use strict"

import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
  axios.get('http://localhost:3001/books')
    .then(function(response){
      // var myHtml = JSON.stringify(response.data);
      // res.render('index', {myHtml});
      const store = createStore(reducers, {"books":{"books":response.data}});
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g, '<\\!--');
    })
    .catch(function(err){
      console.log('#Initial Server-side rendering error', err);
    })
}

module.exports = handleRender;
