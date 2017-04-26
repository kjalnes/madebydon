import React from 'react';

const CartTotals = () => (
  <div>
    <span className='custom-title-1'>Order Total</span>
    <div className='row'>
        <div className='col-xs-6'>
            Subtotal
        </div>
        <div className='col-xs-6'>
            $6048
        </div>
    </div>

    <div className='row'>
        <div className='col-xs-6'>
            Shipping
        </div>
        <div className='col-xs-6'>
            $48
        </div>
    </div>

    <div className='row'>
        <div className='col-xs-6'>
            Tax
        </div>
        <div className='col-xs-6'>
            0.00
        </div>
    </div>

    <div className='row'>
        <div className='col-xs-6'>
            Total
        </div>
        <div className='col-xs-6'>
            <b>$6000</b>
        </div>
    </div>

    <button className='custom-button-1'>Proceed to checkout</button>
  </div>
)

export default CartTotals;
