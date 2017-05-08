import React from 'react';


const Product = ({ product, addtoCart, activeUser, selectProduct }) => {
	if (!product) return null;
	return (
		<div className="col-md-3">
			<div className="productItem">
				<div  onClick={() => selectProduct(product)}>
					<img src={`./public/assets/images/style_${product.id}.jpg`} />
				</div>
				<h3> {product.name} </h3>
				<button onClick={() => addtoCart((activeUser) ? activeUser.orders[0].id : 0, product, 1)} className="custom-button-1 product-list">Add to Cart</button>
			</div>
		</div>
	);
};

const ProductRow = ({ products, addtoCart, activeUser, selectProduct }) => (
	<div className="row">
		{
			products.map((product, index) => (
				<Product key={index} product={product} addtoCart={addtoCart} activeUser={activeUser} selectProduct={selectProduct} />
			))
		}
	</div>
);

const ProductGrid = ({ products, addtoCart, activeUser, selectProduct }) => (
	<div className="container">
		{
			products.reduce((groups, product, index) => {
				if (index % 4 === 0) {
					groups.push([]);
				}
				groups[groups.length - 1].push(product);
				return groups;
			}, []).map((group, index) => (
				<ProductRow key={index} products={group} addtoCart={addtoCart} activeUser={activeUser} selectProduct={selectProduct} />
			))
		}
	</div>
);


export { ProductGrid, ProductRow, Product };
