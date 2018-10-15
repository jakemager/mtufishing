import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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

	render() {
		const { checkout, user, removeFromCheckout } = this.props;
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
							<div
								className="headerOption"
								onClick={() => this.setState({ adminSideMenuVisible: true })}
							>
								<i className="fa fa-cog" />
							</div>
						) : (
							<div />
						)}
						<div
							className="headerOption"
							onClick={() => this.setState({ userSideMenuVisible: true })}
						>
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
		addToCheckout,
		removeFromCheckout
	}
)(Checkout);
