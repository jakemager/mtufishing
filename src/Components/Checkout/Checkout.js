import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';
import CheckoutItem from './CheckoutItem';

class Checkout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { checkout, user } = this.props;

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
				{checkout.map(item => {
					const { name, image, quantityAvailable } = item;
					return <CheckoutItem name={name} image={image} quantityAvailable={quantityAvailable} />;
				})}
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
