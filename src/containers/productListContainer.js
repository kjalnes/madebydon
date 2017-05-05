import React from 'react';
import { connect } from 'react-redux';
import { filterProduct, selectProduct } from '../reducers/productsReducer';
import { addToCart } from '../reducers/cartReducer';


import { ProductContainer, ProductRow, Product } from '../components/products/productsList';
import { SearchProduct } from '../components/products/searchProduct';


class ProductListContainer extends React.Component {
	constructor({ products, addtoCart, filterProducts, activeUser }) {
		super();
	}

	render() {
		if (!this.props.products) return null;
		return (
			<div className="container">
				<ProductContainer products={this.props.products} addtoCart={this.props.addtoCart} activeUser={this.props.activeUser} />
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => (
	{
		addtoCart: (orderId, product, qty) => dispatch(addToCart(orderId, product, qty)),
		filterProduct: (productVal) => dispatch(filterProduct(productVal)),
		selectProduct: () => dispatch(selectProduct(productId))
	}
);

const mapStateToProps = (state) => {
	return (
		{
			activeUser: state.auth.user, //changed to activeUser
			products: state.products
		}
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
