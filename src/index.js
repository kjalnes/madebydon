import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';

import LoginPage from './containers/LoginPage';
import ProductListContainer from './containers/productListContainer';
import CartContainer from './containers/CartContainer';
import AddProduct from './containers/AddProduct';


const root = document.getElementById('root');

const routes = (
  <Provider store = {store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Home } />
        <Route path='products' component={ProductListContainer} />
        <Route path='login' component={LoginPage} />
        <Route path='cart' component={CartContainer} />
        <Route path='product' component={AddProduct} />
      </Route>
    </Router>
  </Provider>
);


render(routes, root);
