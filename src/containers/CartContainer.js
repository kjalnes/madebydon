import React, { Component } from 'react';
import CartProducts from './CartProducts';
import CartTotals from './CartTotals';
import { connect } from 'react-redux';

const CartContainer = (props) => (
    <div className='container'>
        { props.activeUser ?
            <div>
                <CartProducts />
                <hr />
                <div className='row'>
                    <div className='col-xs-8'>
                    </div>
                    <div className='col-xs-4'>
                        <CartTotals cartTotal={ props.cartTotal } />
                    </div>
                </div>
            </div>
            : 'Cart is empty'
        }
    </div>
);


const calculateTotal = (cartItems) => {
    return cartItems.reduce( (total, item) => total + item.product.price *1,0);
}


const mapStateToProps = (state) => (
  {
    activeUser: state.auth.user,
    cartTotal: calculateTotal(state.cart.cartItems)
  }
)

export default connect(mapStateToProps)(CartContainer);
