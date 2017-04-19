import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ProductsPage from './ProductsPage'; 
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';



const root = document.getElementById('root');

const routes = (
  <Provider store = {store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ProductsPage} />
      </Route>
    </Router>
  </Provider>
);


render(routes, root);
