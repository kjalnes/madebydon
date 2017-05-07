import React from 'react';

const ProductDetails = ({ selectedProduct, activeUser, addtoCart, deSelectProduct }) => {
	if (!selectedProduct) return null;
	console.log(selectedProduct)
	return (
		<div className="row">
			<div className="col-md-6">
				<img onClick={ deSelectProduct } src={`./public/assets/images/style_${selectedProduct.id}.jpg`} />
			</div>
			<div className="col-md-6">
				<span className='custom-title-1'>{selectedProduct.name}</span>
				<p><b>$ {selectedProduct.price}</b></p>
				<p>{selectedProduct.description}</p>
				<p>{selectedProduct.productDetails}</p>
				<br /><br />
				<button onClick={() => addtoCart((activeUser) ? activeUser.orders[0].id : 0, selectedProduct, 1)} className='custom-button-1 product-detail'>Add to cart</button>
			</div>
		</div>);
};

export default ProductDetails;
