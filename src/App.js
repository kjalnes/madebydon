import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const App = ({ children, products, activeUser, cartNum })=> (
  <div className=''>
    <Header activeUser={ activeUser} cartNum={cartNum}/>
    <div className='content-container'>
      { children }
    </div>
  </div>
);

const mapStateToProps = (state)=>(
  { products: state.products,
    activeUser: state.auth.user,
    cartNum: state.cart.cartItems.reduce( (total, item) => {
      return total += item.qty }, 0)
   }
);

export default connect(mapStateToProps)(App);
