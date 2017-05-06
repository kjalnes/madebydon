import React from 'react';
import { connect } from 'react-redux';
// import { loadCart, removeFromCart } from '../reducers/cartReducer';
import CartItem from './CartItem';


  const CartProducts = ({ cart, removeFromCart, isFinalStep }) => {
  let giftClass = isFinalStep ? 'gift-message hide' : 'gift-message';
  return (
    <div className='container'>
      <span className={giftClass}>
        <b>Gift?</b> If you wish to gift this item, check the gift wrap option on the product page or let us know in the notes section on the checkout page. Add the personal message you want to include on a card in the notes as well.
      </span>
      {
        (cart.cartItems.length > 0) ?
        <div className='container'>
          <form>
            <table className='table shop_table shop_table_responsive cart' cellSpacing="2" cellPadding="4">
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
          </form>
        </div>
        :
        <div className='container'>
          <div>Cart is Empty</div>
        </div>
      }
    </div>
  );
};

export default CartProducts;
