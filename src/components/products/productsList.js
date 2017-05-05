import React from 'react';


const Product = ({ product, addtoCart, activeUser }) => {
	if (!product) return null;
	return (
		<div className="col-md-3">
			<div className="productItem">
				<img src={`./public/assets/images/style_${product.id}.jpg`} />
				<h3> {product.name} </h3>
				<button onClick={() => addtoCart((activeUser) ? activeUser.orders[0].id : 0, product, 1)} className="custom-button-1">Add to Cart</button>
			</div>
		</div>
	);
};

const ProductRow = ({ products, addtoCart, activeUser }) => (
	<div className="row">
		{
			products.map((product, index) => (
				<Product key={index} product={product} addtoCart={addtoCart} activeUser={activeUser} />
			))
		}
	</div>
);

const ProductContainer = ({ products, addtoCart, activeUser }) => (
	<div className="container">
		{
			products.reduce((groups, product, index) => {
				if (index % 4 === 0) {
					groups.push([]);
				}
				groups[groups.length - 1].push(product);
				return groups;
			}, []).map((group, index) => (
				<ProductRow key={index} products={group} addtoCart={addtoCart} activeUser={activeUser} />
			))
		}
	</div>
);


export { ProductContainer, ProductRow, Product };
