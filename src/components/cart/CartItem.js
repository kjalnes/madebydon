import React from 'react';

const CartItem = ({ orderLine, removeFromCart, isFinalStep }) => {
  if (typeof orderLine === 'undefined') return;

  function onDelete(ev) {
    ev.preventDefault();
    removeFromCart(orderLine.orderId, orderLine.productId);
  }

  return (
      <tr>
        <td className='cart-delete-icon'>
        { isFinalStep ? null :
              <a className='glyphicon glyphicon-remove' title="Remove this item" onClick={(ev) => onDelete(ev)}> </a>
        }
        </td>
        <td className="product-thumbnail">
          <img src={`./public/assets/images/${orderLine.product.imgURL}`} style={{width: '60px'}} />
        </td>
        <td>
          {orderLine.product.name}
        </td>
        <td>
          <span className="amount">$ {orderLine.product.price}</span>
        </td>
        <td>
          <div className="quantity">
            <input type="number" defaultValue={orderLine.qty} title="Qty" className="input-text qty text" size="2" width="5" />
          </div>
        </td>
        <td>
          <span className="amount"> $ {orderLine.qty * orderLine.product.price}</span>
        </td>
      </tr>
  );
};

export default CartItem;
