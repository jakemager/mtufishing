import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser } from '../../actions/user';
import { openSideMenu } from '../../actions/overlays';
import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';
import CheckoutItem from './CheckoutItem';

import './Checkout.css';

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			today: new Date(),
			returnDate: ''
		};
	}

	componentDidMount() {
		if (!this.props.user.userId) this.props.setUser();
	}

	render() {
		const { checkout, user, removeFromCheckout, openSideMenu } = this.props;
		const { today, returnDate } = this.state;
		return (
			<div>
				<div className="header">
					<div className="headerTitle">MTU Fishing Club Locker</div>
					<div className="headerMenu">
						<div className="headerOption" onClick={() => this.props.history.push('/')}>
							Home
						</div>
						<div
							className="headerOption"
							onClick={() => this.props.history.push('./members/checkout')}
						>
							Back
						</div>
						{user.admin ? (
							<div className="headerOption" onClick={() => openSideMenu('admin')}>
								<i className="fa fa-cog" />
							</div>
						) : (
							<div />
						)}
						<div className="headerOption" onClick={() => openSideMenu('user')}>
							<i className="fa fa-user" />
						</div>
					</div>
				</div>
				<div className="cartContainer">
					<div className="cart">
						<h3>Locker Checkout</h3>

						{checkout.map(item => {
							const { Id, name, image, quantityAvailable } = item;
							return (
								<CheckoutItem
									remove={() => removeFromCheckout(Id)}
									name={name}
									image={image}
									quantityAvailable={quantityAvailable}
								/>
							);
						})}

						<div className="checkoutForm">
							<div className="dateForms">
								<div>
									Checkout Date:
									<input
										className="datePicker"
										type="date"
										disabled
										value={today.toJSON().slice(0, 10)}
									/>
								</div>
								<div style={{ marginLeft: 15 }}>
									Return Date:
									<input
										className="datePicker"
										type="date"
										value={returnDate}
										onChange={e => this.setState({ returnDate: e.target.value })}
									/>
								</div>
							</div>
							<button>Checkout</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	checkout: state.lockerRoom.checkout,
	user: state.user.user
});

export default connect(
	mapStateToProps,
	{
		setUser,
		addToCheckout,
		removeFromCheckout,
		openSideMenu
	}
)(Checkout);
