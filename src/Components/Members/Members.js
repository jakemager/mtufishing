import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import logo from '../../assets/images/logo.png';

import { openSideMenu } from '../../actions/overlays';
import { addToCheckout } from '../../actions/lockerRoom';
import { setUser } from '../../actions/user';

import Locker from '../Locker/Locker';

import './Members.css';

class Members extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			user: {},
			lockerFilter: ''
		};
	}

	componentDidMount() {
		if (!this.props.user.userId) this.props.setUser();
	}

	onSignIn = user => {
		if (!!user.error) {
			console.error(user);
			return;
		}

		const params = new URLSearchParams();
		params.append('idToken', user.tokenId);
		params.append('expiresAt', user.tokenObj.expires_at);
		params.append('accessToken', user.accessToken);
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/login/signIn.php',
			data: params
		}).then(res => {
			localStorage.setItem('mtuFishingAccessToken', user.accessToken);
			localStorage.setItem('mtuFishingUserId', res.data.userId);
			this.getUser();
		});
	};

	render() {
		const { checkout, user, openSideMenu } = this.props;
		const { loggedIn, lockerFilter } = this.state;

		if (!!user.userId) {
			return (
				<div>
					<div className="header">
						<div className="headerTitle">MTU Fishing Club Locker</div>
						<input
							type="text"
							placeholder="Search Locker"
							className="searchBox"
							value={lockerFilter}
							onChange={e => this.setState({ lockerFilter: e.target.value })}
						/>
						<div className="headerMenu">
							<div className="headerOption" onClick={() => this.props.history.push('/')}>
								Home
							</div>
							<div
								className="headerOption"
								onClick={() => this.props.history.push('/members/checkout')}
							>
								Checkout ({checkout.length})
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
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Locker filter={lockerFilter} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="notLoggedInContainer">
					<div className="notLoggedInInner">
						<img src={logo} className="notLoggedInLogo" alt="logo" />
						<GoogleLogin
							className="googleSignIn fa fa-google"
							clientId="1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com"
							buttonText=" Sign in with Google"
							onSuccess={this.onSignIn}
							onFailure={this.onSignIn}
						/>
					</div>
				</div>
			);
		}
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
		setUser,
		openSideMenu
	}
)(Members);
