import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const App = ({ children, products, user, cartNum })=> (
  <div className=''>
    <Header user={user} cartNum={cartNum}/>
    <div className='content-container'>
      { children }
    </div>
  </div>
);

const mapStateToProps = (state)=>(
  { products: state.products,
    user: state.auth.user,
    cartNum: state.cart.cartItems.length
   }
);

export default connect(mapStateToProps)(App);
