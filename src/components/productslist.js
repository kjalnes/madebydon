
import React from 'react';
import ReactDOM from 'react-dom';
import ProductListItem from './productitem';
import SearchProduct from './searchProduct';

export default class ProductList extends React.Component{
	constructor({ products, addtoCart, filterProducts}){
		super();
		this.getProductRows=this.getProductRows.bind(this);
	}

	getProductRows(){
		var lis = [];

		this.props.products.map((product)=>{
			product.imgSrc="../public/assets/images/style_"+product.id+'.jpg';
		});

		for (var i = 0;i< this.props.products.length; i=i+4) {
			lis.push(<div className="row">
        			   <div className="col-sm-3">
        			
				        { (this.props.products[i])?
				        	<ProductListItem
                                key={ this.props.products[i].id}
                                product={ this.props.products[i] }
                                addtoCart={()=> this.props.addtoCart((this.props.activeUser) ? this.props.activeUser.orders[0].id : 0, product[i], 1)}
                            />:null
                        }
                    
				        </div><div className="col-sm-3">
				         
				        	{
				        (this.props.products[i+1])?
				        	<ProductListItem
                                key={ this.props.products[i+1].id}
                                product={ this.props.products[i+1] }
                                addtoCart={()=> this.props.addtoCart((this.props.activeUser) ? this.props.activeUser.orders[0].id : 0, product[i+1], 1)}
                            />:null
                        }
                    
				        </div><div className="col-sm-3">
				         
				        	{
				        	(this.props.products[i+2])?
				        	<ProductListItem
                                key={ this.props.products[i+2].id}
                                product={ this.props.products[i+2] }
                                addtoCart={()=> this.props.addtoCart((this.props.activeUser) ? this.props.activeUser.orders[0].id : 0, product[i+2], 1)}
                            />:null
                        }
                    
				        </div><div className="col-sm-3">
				        
				        	{
				        		
				        	(this.props.products[i+3])?
				        	<ProductListItem
                                key={ this.props.products[i+3].id}
                                product={ this.props.products[i+3] }
                                addtoCart={()=> this.props.addtoCart((this.props.activeUser) ? this.props.activeUser.orders[0].id : 0, product[i+3], 1)}
                            />:
                            null

                            }
                           
				        </div>
				 </div>);
		}
		return lis;

	}

	render(){
		return(
		<div>
				<SearchProduct filterProduct={(prodVal)=>{filterProducts(prodVal);}}/>

        <div className="productsList">
		{
			this.getProductRows()

        }


      </div>
    </div>);
	}
}
