import React, { Component } from 'react';

export default class CheckoutItem extends Component {
	constructor(props) {
		super(props);
	}

	createSelectOptions = () => {
		let options = [];
		for (let i = 0; i <= this.props.quantityAvailable; i++) {
			options.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return options;
	};

	getInStock = () => {
		const { quantityAvailable } = this.props;
		if (quantityAvailable) {
			return (
				<p className="inStock">
					<span style={{ color: 'green' }}>In Stock</span> - {quantityAvailable} Available
				</p>
			);
		} else {
			return <span style={{ color: 'red' }}>Not Stock</span>;
		}
	};

	render() {
		const { name, image, remove } = this.props;

		return (
			<div className="checkoutItemContainer">
				<div className="checkoutItemDetailsContainer">
					<img src={`/${image}`} />
					<div className="checkoutItemDetails">
						<div className="details">
							<p className="title">{name}</p>
							{this.getInStock()}
						</div>
						<div className="deleteLink" onClick={remove}>
							Delete
						</div>
					</div>
				</div>
				<select className="selectBox" defaultValue={1}>
					{this.createSelectOptions()}
				</select>
			</div>
		);
	}
}
