import React, { Component } from 'react';

export default class ItemImage extends Component {
	render() {
		return (
			<div className="itemImageContainer itemImageContainerOverlay">
				<div className="inCartOverlay itemImage">
					<i className="inCartIcon fa fa-check" />
					<img src={`${item.image}`} alt={item.name} className="itemImage" />
				</div>
			</div>
		);
	}
}
