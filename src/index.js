import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';
import LoginContainer from './containers/LoginContainer';
import ProductListContainer from './containers/productListContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';

const root = document.getElementById('root');

const routes = (
  <Provider store = {store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ ProductListContainer } />
        <Route path='login' component={ LoginContainer } />
        <Route path='cart' component={ CartContainer } >
        </Route>
        <Route path='checkout' component={ CheckoutContainer } />
      </Route>
    </Router>
  </Provider>
);


render(routes, root);
