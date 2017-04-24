import React from 'react';

const CartItem = ({ orderLine, removeFromCart }) => {
  if (typeof orderLine === 'undefined') return;

  console.log('orderLine', orderLine);

  return (
    <tr>
      <td>
        <a title="Remove this item" onClick={ () => removeFromCart(orderLine.id, orderLine.productId) }>&times;</a>
      </td>
      <td className="product-thumbnail">
        <img src="http://placehold.it/60x60"  />
      </td>
      <td>
        { orderLine.product.name }
      </td>
      <td>
        <span className="amount">$ { orderLine.product.price}</span>
      </td>
      <td>
        <div className="quantity">
          <input type="number" defaultValue={ orderLine.qty} title="Qty" className="input-text qty text" size="2" width="5" />
        </div>
      </td>
      <td>
        <span className="amount"> $ { orderLine.qty * orderLine.product.price}</span>
      </td>
    </tr>
  );
};

export default CartItem;
