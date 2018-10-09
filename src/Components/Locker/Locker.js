import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../Common/Loading';

import './Locker.css';

export default class Locker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			items: [],
			filteredItems: []
		};
	}

	componentDidMount() {
		this.getItems();
	}

	componentDidUpdate(prevProps) {
		const { filter } = this.props;
		const { items } = this.state;

		if (filter !== prevProps.filter) {
			let filteredItems = [...items];
			if (filter.length) {
				filteredItems = items.filter(item =>
					item.name.toLowerCase().includes(filter.toLowerCase())
				);
			}

			this.setState({ filteredItems });
		}
	}

	getItems = () => {
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/locker/getItems.php'
		}).then(res => {
			console.log(res.data);
			this.setState({ items: res.data, filteredItems: res.data, loading: false });
		});
	};

	renderItems = () => {
		const { filteredItems } = this.state;

		return filteredItems.map(item => {
			return (
				<div key={item.Id} className="itemContainer">
					<div className="itemImageContainer">
						<img src={`${item.image}`} alt={item.name} className="itemImage" />
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
