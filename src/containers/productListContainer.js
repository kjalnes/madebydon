import React from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/productslist';
import { filterProduct } from '../reducers/productsReducer';
import { addToCart } from '../reducers/cartReducer';


const mapDispatchToProps = (dispatch)=> (
  {
    addtoCart: (product)=> dispatch(addToCart(product)),
    filterProduct: (productVal)=>dispatch(filterProduct(productVal))
  }
);

const mapStateToProps = (state)=> {
	return (
 		{
    		products: state.products
 		}
	);
}

let ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductListContainer;
