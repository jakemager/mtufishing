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

	render() {
		const { name, image } = this.props;

		return (
			<div>
				{name}, <select>{this.createSelectOptions()}</select>
			</div>
		);
	}
}
