import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addToCheckout } from '../../actions/lockerRoom';

import Loading from '../Common/Loading';

import './Locker.css';

class Locker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			items: [],
			filteredItems: [],
			cartItems: [],
			hoveredItem: null
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
			url: 'http://localhost:8888/server/locker/getItems.php'
		}).then(res => {
			this.setState({ items: res.data, filteredItems: res.data, loading: false });
		});
	};

	addToCart = item => {
		const { cartItems } = this.state;
		this.setState({ cartItems: [...cartItems, item] });
	};

	removeFromCart = itemToRemove => {
		const { cartItems } = this.state;
		let newCartItems = cartItems.filter(item => item !== itemToRemove);
		this.setState({ cartItems: newCartItems });
	};

	renderItems = () => {
		const { addToCheckout, checkout } = this.props;
		const { filteredItems, hoveredItem } = this.state;

		return filteredItems.map(item => {
			let inCart = checkout.filter(checkoutItem => checkoutItem === item).length;
			let isHover = hoveredItem === item.Id;

			return (
				<div
					key={item.Id}
					className="itemContainer"
					onMouseEnter={() => this.setState({ hoveredItem: item.Id })}
					onMouseLeave={() => this.setState({ hoveredItem: null })}
				>
					{inCart ? (
						<div className="itemImageContainer itemImageContainerOverlay">
							<div className="inCartOverlay itemImage">
								<i className="inCartIcon fa fa-check" />
								<img src={`${item.image}`} alt={item.name} className="itemImage" />
							</div>
						</div>
					) : (
						<div className="itemImageContainer">
							<img src={`${item.image}`} alt={item.name} className="itemImage" />
						</div>
					)}

					<div
						style={
							inCart
								? { backgroundColor: '#97db8f', height: '100%', zIndex: '4' }
								: { height: '100%' }
						}
					>
						<div className="itemTitle">{item.name}</div>
						<div className="itemAvailability">{item.quantityAvailable} Available</div>
						{isHover ? (
							<div className="itemIconsContainer">
								<i className="itemIcon info fa fa-info" />
								{inCart ? (
									<i
										onClick={() => this.removeFromCart(item)}
										className="itemIcon minus fa fa-minus"
									/>
								) : (
									<i onClick={() => addToCheckout(item)} className="itemIcon plus fa fa-plus" />
								)}
							</div>
						) : (
							<span />
						)}
					</div>
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

const mapStateToProps = state => ({
	checkout: state.lockerRoom.checkout
});

export default connect(
	mapStateToProps,
	{
		addToCheckout
	}
)(Locker);
