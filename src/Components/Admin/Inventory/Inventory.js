import React, { Component } from 'react';
import Header from '../Header';

export default class Inventory extends Component {
	render() {
		return (
			<div>
				<Header history={this.props.history} />
			</div>
		);
	}
}
