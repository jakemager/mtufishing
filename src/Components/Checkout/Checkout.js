import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { setUser } from '../../actions/user';
import { openSideMenu } from '../../actions/overlays';
import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';
import CheckoutItem from './CheckoutItem';

import './Checkout.css';

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			today: moment().format('YYYY-MM-DD'),
			returnDate: moment()
				.add('1', 'week')
				.format('YYYY-MM-DD'),
			checkoutSuccess: false
		};
	}

	componentDidMount() {
		if (!this.props.user.userId) this.props.setUser();
	}

	checkout = () => {
		const { returnDate, today } = this.state;

		let params = new URLSearchParams();
		params.append('items', JSON.stringify(this.props.checkout));
		params.append('studentId', localStorage.getItem('mtuFishingUserId'));
		params.append('checkoutDate', today);
		params.append('returnDate', moment(returnDate).format('YYYY-MM-DD'));
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/locker/checkout.php',
			data: params
		}).then(res => {
			if (res.data) {
				this.props.checkout.map(item => {
					this.props.removeFromCheckout(item.Id);
					this.setState({
						checkoutSuccess: true
					});
				});
			}
		});
	};

	header = () => {
		const { user, openSideMenu } = this.props;

		return (
			<div className="header">
				<div className="headerTitle">MTU Fishing Club Locker</div>
				<div className="headerMenu">
					<div className="headerOption" onClick={() => this.props.history.push('/')}>
						Home
					</div>
					<div className="headerOption" onClick={() => this.props.history.push('/members')}>
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
		);
	};

	render() {
		const { checkout, removeFromCheckout } = this.props;
		const { today, returnDate, checkoutSuccess } = this.state;

		if (checkoutSuccess)
			return (
				<div>
					{this.header()}
					<p>
						Checkout successful. The equipment manager has been emailed and should contact you
						shortly.
					</p>
					<p className="backLink" onClick={() => this.props.history.push('/members')}>
						Go Back
					</p>
				</div>
			);

		return (
			<div>
				{this.header()}
				<div className="cartContainer">
					<div className="cart">
						<h3>Locker Checkout</h3>

						{checkout.length ? (
							<div>
								{checkout.map((item, i) => {
									const { Id, name, image, quantityAvailable } = item;
									return (
										<CheckoutItem
											key={i}
											Id={Id}
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
											<input className="datePicker" type="date" disabled value={today} />
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
									<button onClick={() => this.checkout()}>Checkout</button>
								</div>
							</div>
						) : (
							<div>
								<p>You haven't added any items to the cart yet!</p>
								<p className="backLink" onClick={() => this.props.history.push('/members')}>
									Go Back
								</p>
							</div>
						)}
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
