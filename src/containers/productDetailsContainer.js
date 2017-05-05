import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from '../components/products/productdetails';
import { addToCart } from '../reducers/cartReducer';


const mapDispatchToProps = (dispatch) => (
	{
		addtoCart: (orderId, product, qty) => dispatch(addToCart(orderId, product, qty))
	}
);

const mapStateToProps = (state) => {
	return (
		{
			activeProduct: state.activeProduct //changed to activeUser

		}
	);
}

let ProductDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
export default ProductDetailsContainer;
