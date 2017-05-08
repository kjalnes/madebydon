import React, { Component } from 'react';

class CartTotals extends Component  {

    onCheckoutClick(ev) {
      ev.preventDefault()
      if(this.props.activeUser) {
        this.props.router.push('/checkout/shipping')
      } else {
        this.props.router.push('/checkout')
      }
    }

    render() {
        const tax = this.props.cartTotal * (this.props.tax /100);
        const orderTotal =  (this.props.cartTotal + tax + this.props.shipping);

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
                 $ { this.props.shipping }
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-6'>
                    Tax
                </div>
                <div className='col-xs-6'>
                    $ { tax.toFixed(2) }
                </div>
            </div>

            <div className='row total'>
                <div className='col-xs-6'>
                    <b>Total</b>
                </div>
                <div className='col-xs-6'>
                    <b>$ { orderTotal.toFixed(2) }</b>
                </div>
            </div>
            { this.props.isFinalStep ?
                null
                :
                <button onClick={ this.onCheckoutClick.bind(this) } className='custom-button-1'>Proceed to checkout</button>

            }

          </div>
        )

    }
}

export default CartTotals;
