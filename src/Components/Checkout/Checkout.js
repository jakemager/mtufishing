import React, { Component } from 'react';
import axios from 'axios';

export default class Checkout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{JSON.stringify(this.props.cartItems)}
			</div>
		);
	}
}
