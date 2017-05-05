import React from 'react';

export default class SearchProduct extends React.Component {
	constructor({ filterProducts }) {
		super();
		this.handleSearch = this.handleSearch.bind(this);
	}
	handleSearch(event) {
		filterProducts(event.target.value);
	}
	render() {
		return (
			<div className="productSearch">
				<input type="text" onChange={this.handleSearch} />
			</div>
		);
	}
}
