import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateQuantity } from '../../actions/lockerRoom';

class CheckoutItem extends Component {
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
		const { Id, name, image, quantity, remove } = this.props;

		return (
			<div className="checkoutItemContainer">
				<div className="checkoutItemDetailsContainer">
					<img src={`/${image}`} />
					<div className="checkoutItemDetails">
						<div className="details">
							<p className="title">{name}</p>
							{this.getInStock()}
						</div>
						<button className="deleteLink" onClick={remove}>
							Delete
						</button>
					</div>
				</div>
				<div style={{ width: 55 }}>
					<select
						className="selectBox"
						defaultValue={1}
						value={quantity}
						onChange={e => this.props.updateQuantity(Id, e.target.value)}
					>
						{this.createSelectOptions()}
					</select>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{
		updateQuantity
	}
)(CheckoutItem);
