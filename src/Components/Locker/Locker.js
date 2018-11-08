import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';

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
			url: '/server/locker/getItems.php'
		}).then(res => {
			this.setState({ items: res.data, filteredItems: res.data, loading: false });
		});
	};

	renderItems = () => {
		const { addToCheckout, removeFromCheckout, checkout } = this.props;
		const { filteredItems, hoveredItem } = this.state;

		return filteredItems.map(item => {
			let inCart = checkout.filter(checkoutItem => checkoutItem.Id === item.Id).length;

			let isHover = hoveredItem === item.Id;

			if (item.quantityAvailable > 0)
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
									<img src={`/${item.image}`} alt={item.name} className="itemImage" />
								</div>
							</div>
						) : (
							<div className="itemImageContainer">
								<img src={`/${item.image}`} alt={item.name} className="itemImage" />
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
											onClick={() => removeFromCheckout(item.Id)}
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
			else
				return (
					<div key={item.Id} className="itemContainer">
						<div className="itemImageContainer itemImageContainerOverlayNotAvaliable">
							<div className="inCartOverlay itemImage">
								<img src={`/${item.image}`} alt={item.name} className="itemImage" />
							</div>
						</div>

						<div style={{ backgroundColor: '#fd868d', height: '100%', zIndex: '4' }}>
							<div className="itemTitle">{item.name}</div>
							<div className="itemAvailability" style={{ fontWeight: 500 }}>
								Not Available
							</div>
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
		addToCheckout,
		removeFromCheckout
	}
)(Locker);
