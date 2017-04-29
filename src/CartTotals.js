import React from 'react';

const CartTotals = (props) => {
    return (
      <div className='cart-totals'>
        <span className='custom-title-1'>Order Total</span>
        <div className='row'>
            <div className='col-xs-6'>
                Subtotal
            </div>
            <div className='col-xs-6'>
                $ { props.cartTotal }
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-6'>
                Shipping
            </div>
            <div className='col-xs-6'>
                $ 0
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-6'>
                Tax
            </div>
            <div className='col-xs-6'>
                $ 0
            </div>
        </div>

        <div className='row total'>
            <div className='col-xs-6'>
                <b>Total</b>
            </div>
            <div className='col-xs-6'>
                <b>$ { props.cartTotal }</b>
            </div>
        </div>

        <button className='custom-button-1'>Proceed to checkout</button>
      </div>
    )
}

export default CartTotals;
