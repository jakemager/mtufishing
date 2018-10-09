import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../Common/Loading';

import './Locker.css';

export default class Locker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			items: []
		};
	}

	componentDidMount() {
		this.getItems();
	}

	getItems = () => {
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/locker/getItems.php'
		}).then(res => {
			console.log(res.data);
			this.setState({ items: res.data, loading: false });
		});
	};

	renderItems = () => {
		const { items } = this.state;

		return items.map(item => {
			return (
				<div key={item.Id} className="itemContainer">
					<div className="itemImageContainer">
						<img src={`./${item.image}`} alt={item.name} className="itemImage" />
					</div>
					<div className="itemTitle">{item.name}</div>
					<div className="itemAvailability">{item.quantityAvailable} Available</div>
				</div>
			);
		});
	};

	render() {
		const { loading } = this.state;

		if (loading) return <Loading />;
		else return <div className="lockerContainer">{this.renderItems()}</div>;
	}
}
