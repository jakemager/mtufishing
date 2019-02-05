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
		window.addEventListener('resize', this.handleWindowSizeChange);
		this.handleWindowSizeChange();
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		console.log(window.innerWidth);
		this.setState({ isMobile: window.innerWidth <= 650 });
	};

	getItems = () => {
		axios({
			method: 'post',
			url: '/server/locker/getItems.php'
		}).then(res => {
			this.setState({ items: res.data, filteredItems: res.data, loading: false });
		});
	};

	renderItems = () => {
		const { checkout } = this.props;
		const { filteredItems, isMobile } = this.state;

		return filteredItems.map(item => {
			let inCart = checkout.filter(checkoutItem => checkoutItem.Id === item.Id).length;
			if (isMobile)
				return <MobileItem available={item.quantityAvailable > 0} item={item} inCart={inCart} />;
			else return <Item available={item.quantityAvailable > 0} item={item} inCart={inCart} />;
		});
	};

	render() {
		const { loading } = this.state;

		if (loading) return <Loading />;
		else return <div className="lockerContainer">{this.renderItems()}</div>;
	}
}

const mapStateToProps = state => ({
	checkout: state.lockerRoom.checkout
});

export default connect(
	mapStateToProps,
	{}
)(Locker);
