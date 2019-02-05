import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Loading from '../Common/Loading';

import './Locker.css';
import Item from './Item';
import MobileItem from './MobileItem';

class Locker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			items: [],
			filteredItems: [],
			cartItems: [],
			hoveredItem: null,
			showInfo: false,
			isMobile: false
		};
	}

	componentDidMount() {
		this.getItems();
	}

	componentDidUpdate(prevProps, prevState) {
		const { filter } = this.props;
		const { items } = this.state;

		// If user does search
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
			url: '/server/locker/getItems.php'
		}).then(res => {
			this.setState({ items: res.data, filteredItems: res.data, loading: false });
		});
	};

	renderItems = () => {
		const { checkout, isMobile } = this.props;
		const { filteredItems } = this.state;

		return filteredItems.map(item => {
			let inCart = checkout.filter(checkoutItem => checkoutItem.Id === item.Id).length;
			if (isMobile)
				return <MobileItem available={item.quantityAvailable > 0} item={item} inCart={inCart} />;
			else return <Item available={item.quantityAvailable > 0} item={item} inCart={inCart} />;
		});
	};

	render() {
		const { isMobile, changeFilter, filter } = this.props;
		const { loading } = this.state;

		if (loading) return <Loading />;
		else
			return (
				<div className="lockerContainer">
					{isMobile && (
						<input
							type="text"
							placeholder="Search Locker"
							style={{
								width: '90vw',
								border: '1px solid #ccc',
								height: 26,
								marginTop: 10,
								marginBottom: 10,
								borderRadius: 3,
								padding: 2
							}}
							value={filter}
							onChange={e => changeFilter(e)}
						/>
					)}
					{this.renderItems()}
				</div>
			);
	}
}

const mapStateToProps = state => ({
	checkout: state.lockerRoom.checkout
});

export default connect(
	mapStateToProps,
	{}
)(Locker);
