
import React from 'react';
import ReactDOM from 'react-dom';
import ProductListItem from './productitem';
import SearchProduct from './searchProduct';

export default class ProductList extends React.Component{
	constructor({ cart, products, addtoCart, filterProducts}){
		super();
	}

	render(){
		console.log('add to cart', this.props.addtoCart);
		return(
		<div>
				<SearchProduct filterProduct={(prodVal)=>{filterProducts(prodVal);}}/>

        <div>
		{
			this.props.products.map((product)=>{
				product.imgSrc="./public/assets/images/style_"+product.id+'.jpg';
				return(<div className="row">
        			   <div className="col-sm-4">
				        	<ProductListItem
                                key={ product.id}
                                product={ product }
                                addtoCart={()=> this.props.addtoCart(this.props.cart.orderId, product, 1)}
                            />
				        </div>
				 </div>)
			})

        }


      </div>
    </div>);
	}
}
