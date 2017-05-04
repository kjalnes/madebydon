import React from 'react';
import ReactDOM from 'react-dom';

export default class ProductListItem extends React.Component{
	constructor({ product, addtoCart}){
			super();
	}
	render(){
		return(<div className="productItem">
				<img  src={this.props.product.imgSrc} className=""/>
	   			<h4> { this.props.product.name } </h4>
	    		<button onClick={ this.props.addtoCart } className='btn'>Add to cart</button>
   			</div>
   			);
	}
}
