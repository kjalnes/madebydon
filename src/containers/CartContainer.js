import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartProducts from '../components/cart/CartProducts';
import CartTotals from '../components/cart/CartTotals';
import { loadCart, removeFromCart } from '../reducers/cartReducer';

const CartContainer = (props) => {
    const { activeUser, cart, shipping, tax, removeFromCart, cartTotal, router, isFinalStep } = props;
    const containerClass = isFinalStep ? '' : 'container';

    return (
        <div className={containerClass}>
            {cart ?
                <div>
                    <CartProducts cart={cart} removeFromCart={removeFromCart} isFinalStep={isFinalStep} />
                    <hr />
                    <div className='row'>
                        <div className='col-xs-8'>
                        </div>
                        <div className='col-xs-4'>
                            <CartTotals cartTotal={cartTotal} shipping={shipping} tax={tax}  activeUser={activeUser} router={router} isFinalStep={isFinalStep} />
                        </div>
                    </div>
                </div>

                : 'Cart is empty'
            }
        </div>
    )
};

const calculateTotal = (cartItems, shipping) => {
    return cartItems.reduce((total, item) => total + item.product.price * item.qty, 0);
}

const mapStateToProps = (state) => (
    {
            activeUser: state.auth.user,
            cart: state.cart,
            cartTotal: calculateTotal(state.cart.cartItems),
            shipping: state.order.order && state.order.order[0] ? state.order.order[0].shippingCost : 0,
            tax: state.order.order && state.order.order[0] ? state.order.order[0].tax : 0
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        // loadCart: (orderId) => dispatch(loadCart(orderId)),
        removeFromCart: (orderId, product) => dispatch(removeFromCart(orderId, product))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

