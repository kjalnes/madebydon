import React, { Component } from 'react';
// import { browserHistory } from 'react-router';

class CartTotals extends Component  {

    onCheckoutClick(ev) {
      ev.preventDefault()
        if (this.props.activeUser) {    // there is not an activeUser
            console.log('we have a user')
            // go to billing and shipping page
        } else {
            console.log('we dont have a user')
            this.props.router.push('/checkout')
            // show login form
            // show link to create User form page
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



/*
on click prevent default

onCheckoutClick(ev) {
 //   ev.preventDefault()
    if there is not an activeUser
        show create User form page
    else
        go to billing and shipping page
}

*/
