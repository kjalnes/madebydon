import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import LoginContainer from './containers/LoginContainer';
import ProductContainer from './containers/ProductContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import CheckoutStep1 from './components/checkout/CheckoutStep1';
import CheckoutStep2 from './components/checkout/CheckoutStep2';
import CheckoutStep3 from './components/checkout/CheckoutStep3';
import CheckoutStep4 from './components/checkout/CheckoutStep4';
import About from './components/About';

const root = document.getElementById('root');

const routes = (
  <Provider store = { store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ ProductContainer } />
        <Route path='login' component={ LoginContainer } />
        <Route path='about' component={ About } />
        <Route path='cart' component={ CartContainer } />
        <Route path='checkout' component={ CheckoutContainer } >
          <Route path='/checkout/shipping' component={ CheckoutStep1 } />
          <Route path='/checkout/billing' component={ CheckoutStep2 } />
          <Route path='/checkout/payment' component={ CheckoutStep3 } />
          <Route path='/checkout/complete' component={ CheckoutStep4 } />
        </Route>
      </Route>
    </Router>
  </Provider>
);


render(routes, root);
