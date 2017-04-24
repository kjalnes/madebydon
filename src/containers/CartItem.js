import React from 'react';

const CartItem = (item) => {
  if (typeof item === 'undefined') return;

  return (
    <tr>
      <td>
        <a title="Remove this item">&times;</a>
      </td>
      <td className="product-thumbnail">
        <img src="http://placehold.it/60x60"  />
      </td>
      <td>
        {item.item.product.name}
      </td>
      <td>
        <span className="amount">$ {item.item.product.price}</span>
      </td>
      <td>
        <div className="quantity">
          <input type="number" defaultValue={item.item.qty} title="Qty" className="input-text qty text" size="2" width="5" />
        </div>
      </td>
      <td>
        <span className="amount"> $ {item.item.qty * item.item.product.price}</span>
      </td>
    </tr>
  );
};

export default CartItem;
