
import React from 'react';
import ReactDOM from 'react-dom';
import ProductListItem from './productitem';
import SearchProduct from './searchProduct';

export default class ProductList extends React.Component{
	constructor({ products, addtoCart, filterProducts}){
		super();
		
	}
	render(){
		return(
		<div>
				<SearchProduct filterProduct={(prodVal)=>{filterProducts(prodVal);}}/>
	
        <div>
		{
			this.props.products.map((product)=>{
				product.imgSrc="./public/assets/images/style_"+product.id+'.jpg';
				return(<div className="row">
        			   <div className="col-sm-4">
				        	<ProductListItem  key={ product.id} product={ product } addtoCart={()=> this.props.addtoCart(1,product.id,1)} />
				        </div>
				 </div>)
			})
        		
        }
			

      </div>
    </div>);
	}
}
