import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchProduct extends React.Component{
	constructor({ filterProducts }){
		super();
		this.handleSearch=this.handleSearch.bind(this);
	}
	handleSearch(event){
		filterProducts(event.target.value);
	}
	render(){
		return(<div>
				<input type="text" onChange={this.handleSearch}/>
   			</div>
   			);
	}
}