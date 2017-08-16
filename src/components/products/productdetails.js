import React from 'react';

const ProductDetails = ({ selectedProduct, activeUser, addtoCart, deSelectProduct }) => {
	if (!selectedProduct) return null;

	function listHelper(text) {
		return text.split('\n').map((detail, key) => <span key={key}>{detail}<br /></span>)
	}

	return (

		<div className="row selectedProduct">
			<div className="col-md-12 x-icon-container">
				<img className='x-icon' onClick={deSelectProduct} src={`./public/assets/images/x.ico`} />
			</div>
			<div className="col-md-6">
				<img src={`./public/assets/images/${selectedProduct.imgURL}`} />
			</div>
			<div className="col-md-6">
				<span className="custom-title-1">{selectedProduct.name}</span>
				<p><b>$ {selectedProduct.price}</b></p>
				<p>{selectedProduct.description}</p>
				<p>{ listHelper(selectedProduct.productDetails) }</p>
				<br /><br />
				<button onClick={() => addtoCart((activeUser) ? activeUser.orders[0].id : 0, selectedProduct, 1)} className="custom-button-1 product-detail">Add to cart</button>
			</div>
		</div>);
};

export default ProductDetails;
