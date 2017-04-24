import React from 'react';
import { connect } from 'react-redux';

import { loadCart, removeFromCart } from '../reducers/cartReducer';
import CartItem from './cartItem';


const CartPage = ({ cart, removeFromCart }) => {
  return (
    (cart.cartItems.length > 0) ?
      <form>
        <table className="shop_table shop_table_responsive cart" cellSpacing="2" cellPadding="4">
          <thead>
            <tr>
              <th className="product-remove">&nbsp;</th>
              <th className="product-thumbnail">&nbsp;</th>
              <th className="product-name">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-subtotal">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((orderLine) => (<CartItem key={orderLine.id} orderLine={orderLine} removeFromCart={ removeFromCart } />))}
          </tbody>
        </table>
      </form> :
      <div>Cart is Empty</div>
  );
};

const mapStateToProps = (state) => (
  {
    cart: state.cart
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    loadCart: (orderId) => dispatch(loadCart(orderId)),
    removeFromCart: (orderId, product) => dispatch(removeFromCart(orderId, product))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
