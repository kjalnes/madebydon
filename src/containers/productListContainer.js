import React from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/productslist';
import { filterProduct } from '../reducers/productsReducer';
import { addToCart } from '../reducers/cartReducer';


const mapDispatchToProps = (dispatch)=> (
  {
	addtoCart: (orderId, product, qty) => dispatch(addToCart(orderId, product, qty)),
    filterProduct: (productVal)=>dispatch(filterProduct(productVal))
  }
);

const mapStateToProps = (state)=> {
	return (
 		{
				activeUser: state.auth.user, //changed to activeUser
    		products: state.products
 		}
	);
}

let ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductListContainer;
