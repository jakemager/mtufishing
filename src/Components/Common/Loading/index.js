import React, { Component } from 'react';
import './Loading.css';

// From https://loading.io/css/
export default class Loading extends Component {
	render() {
		return (
			<div className="lds-ring">
				<div />
				<div />
				<div />
				<div />
			</div>
		);
	}
}
