import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';
import LoginContainer from './containers/LoginContainer';
import ProductListContainer from './containers/productListContainer';
import ProductDetailsContainer from './containers/productDetailsContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import CheckoutStep1 from './CheckoutStep1';
import CheckoutStep2 from './CheckoutStep2';
import CheckoutStep3 from './CheckoutStep3';
import CheckoutStep4 from './CheckoutStep4';

const root = document.getElementById('root');

const routes = (
  <Provider store = { store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ ProductListContainer } />
        <Route path='login' component={ LoginContainer } />
        <Route path='cart' component={ CartContainer } />
        <Route path='checkout' component={ CheckoutContainer } >
          <Route path='/checkout/shipping' component={ CheckoutStep1 } />
          <Route path='/checkout/billing' component={ CheckoutStep2 } />
          <Route path='/checkout/payment' component={ CheckoutStep3 } />
          <Route path='/checkout/complete' component={ CheckoutStep4 } />
        </Route>
        <Route path='productDetails' component={ ProductDetailsContainer } />
      </Route>
    </Router>
  </Provider>
);


render(routes, root);
