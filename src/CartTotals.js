import React, { Component } from 'react';
// import { browserHistory } from 'react-router';

class CartTotals extends Component  {

    onCheckoutClick(ev) {
      ev.preventDefault()
        if (this.props.activeUser) {
            console.log('we have a user')
            this.props.router.push('/checkout')
            // this.props.router.push('/checkout/billing')
            // go to billing and shipping page
            // not set up yet
        } else {
            console.log('we dont have a user')
            this.props.router.push('/checkout')
        }
    }

    render() {
        return (
          <div className='cart-totals'>
            <span className='custom-title-1'>Order Total</span>
            <div className='row'>
                <div className='col-xs-6'>
                    Subtotal
                </div>
                <div className='col-xs-6'>
                    $ { this.props.cartTotal }
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
                    <b>$ { this.props.cartTotal }</b>
                </div>
            </div>
            <button onClick={ this.onCheckoutClick.bind(this) } className='custom-button-1'>Proceed to checkout</button>
          </div>
        )

    }
}

export default CartTotals;
