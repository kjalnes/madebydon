import React from 'react';
import { connect } from 'react-redux';

import { addToCart } from '../reducers/cartReducer';


const AddProduct = ({ addToCart }) => {
  function onAdd(ev, orderId, productId, qty) {
    ev.preventDefault();
    addToCart(orderId, productId, qty);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={(ev) => onAdd(ev, 1, 2, 10)}>
        Add product
      </button>
      <button className="btn btn-primary" onClick={(ev) => onAdd(ev, 1, 3, 10)}>
        Add product 2
      </button>
    </div>
  );
};


const mapStateToProps = (state) => (
  {
    products: state.products
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addToCart: (orderId, productId, qty) => dispatch(addToCart(orderId, productId, qty)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
