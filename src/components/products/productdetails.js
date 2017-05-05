import React from 'react';

export default class ProductDetails extends React.Component{
	constructor({ activeProduct, addtoCart}){
			super();
	}
	render(){
		return (
			<div className="activeItem">
				<img  src={this.props.activeProduct.imgSrc} className="" />
				<h4> { this.props.activeProduct.name } </h4>
				<button onClick={ this.props.addtoCart } className='btn'>Add to cart</button>
			</div>
			);
	}
}
