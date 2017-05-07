import React from 'react';

const ProductDetails = ({ selectedProduct, activeUser, addtoCart }) => {
	if (!selectedProduct) return null;
	return (
		<div className="row">
			<div className="col-md-6">
				<img src={`./public/assets/images/style_${selectedProduct.id}.jpg`} />
			</div>
			<div className="col-md-6">
				<h3>{selectedProduct.name}</h3>
				<p> This is a brief description</p>
				<br /><br />
				<button onClick={() => addtoCart((activeUser) ? activeUser.orders[0].id : 0, selectedProduct, 1)} className='btn'>Add to cart</button>
			</div>
		</div>);
};

export default ProductDetails;
