import React, { Component } from 'react';
import CartProducts from './CartProducts';
import CartTotals from './CartTotals';
import { connect } from 'react-redux';
import { loadCart, removeFromCart } from '../reducers/cartReducer';


const CartContainer = ({ activeUser, cart, removeFromCart, cartTotal }) => (
    <div className='container'>
        { activeUser ?
            <div>
                <CartProducts cart={ cart } removeFromCart={ removeFromCart } />
                <hr />
                <div className='row'>
                    <div className='col-xs-8'>
                    </div>
                    <div className='col-xs-4'>
                        <CartTotals cartTotal={ cartTotal } />
                    </div>
                </div>
            </div>
            : 'Cart is empty'
        }
    </div>
);


const calculateTotal = (cartItems) => {
    return cartItems.reduce( (total, item) => total + item.product.price *1, 0);
}


const mapStateToProps = (state) => (
  {
    activeUser: state.auth.user,
    cart: state.cart,
    cartTotal: calculateTotal(state.cart.cartItems)
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // loadCart: (orderId) => dispatch(loadCart(orderId)),
    removeFromCart: (orderId, product) => dispatch(removeFromCart(orderId, product))
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
