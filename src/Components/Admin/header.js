import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser } from '../../actions/user';
import { openSideMenu } from '../../actions/overlays';
import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';

// import './Checkout.css';

class Header extends Component {
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
		const { openSideMenu } = this.props;

		return (
			<div>
				<div className="header">
					<div className="headerTitle">MTU Fishing Club Locker</div>
					<div className="headerMenu">
						<div className="headerOption" onClick={() => this.props.history.push('/')}>
							Home
						</div>
						<div className="headerOption" onClick={() => this.props.history.push('/members')}>
							Locker
						</div>
						<div className="headerOption" onClick={() => this.props.history.push('./admin/items')}>
							Items
						</div>
						<div
							className="headerOption"
							onClick={() => this.props.history.push('./admin/inventory')}
						>
							Inventory
						</div>
						<div className="headerOption" onClick={() => this.props.history.push('./admin/items')}>
							Items
						</div>
						<div className="headerOption" onClick={() => this.props.history.push('./admin/users')}>
							Users
						</div>
						<div
							className="headerOption"
							onClick={() => this.props.history.push('./admin/sponsors')}
						>
							Sponsors
						</div>
						<div className="headerOption" onClick={() => openSideMenu('admin')}>
							<i className="fa fa-cog" />
						</div>
						<div className="headerOption" onClick={() => openSideMenu('user')}>
							<i className="fa fa-user" />
						</div>
					</div>
				</div>
				<div className="cartContainer" />
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
)(Header);
