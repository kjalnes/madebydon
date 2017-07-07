import React from 'react';
import { connect } from 'react-redux';
import { selectProduct, deSelectProduct } from '../redux/reducers/productsReducer';
import { addToCart  } from '../redux/reducers/cartReducer';
import { ProductGrid, ProductRow, Product } from '../components/products/productsList';
import ProductDetails from '../components/products/productdetails';

class ProductContainer extends React.Component {
	constructor({ products, activeUser, addtoCart, selectProduct, deSelectProduct }) {
		super();
	}

	render() {
		if (!this.props.products) return null;
		return (
			(!this.props.selectedProduct) ?
				<div className="">
					<div className='text-center'>
	           	<span className='custom-title-2'>DON MAKES HANDMADE LEATHER BAGS AND NOBODY HELPS HIM.</span>
	       	</div>
					<ProductGrid
						products={this.props.products}
						activeUser={this.props.activeUser}
						addtoCart={this.props.addtoCart}
						selectProduct={this.props.selectProduct} />
				</div>
				: <div className="container">
					<ProductDetails
						selectedProduct={this.props.selectedProduct}
						activeUser={this.props.activeUser}
						addtoCart={this.props.addtoCart}
						deSelectProduct={this.props.deSelectProduct} />
				</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => (
	{
		addtoCart: (orderId, product, qty) => dispatch(addToCart(orderId, product, qty)),
		selectProduct: (product) => dispatch(selectProduct(product)),
		deSelectProduct: () => dispatch(deSelectProduct())
	}
);

const mapStateToProps = (state) => {
	return (
		{
			activeUser: state.auth.user, //changed to activeUser
			products: state.products.list,
			selectedProduct: state.products.selectedProduct
		}
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
