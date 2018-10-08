import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import logo from '../../assets/images/logo.png';

import UserSideMenu from '../SideMenu/UserSideMenu';
import AdminSideMenu from '../SideMenu/AdminSideMenu';
import Loading from '../Common/Loading';

import './Members.css';

export default class Members extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			userSideMenuVisible: null,
			adminSideMenuVisible: null,
			user: {}
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {
		const params = new URLSearchParams();
		params.append('accessToken', localStorage.getItem('mtuFishingAccessToken'));
		params.append('userId', localStorage.getItem('mtuFishingUserId'));
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/getUser.php',
			data: params
		}).then(res => {
			if (res.data) this.setState({ user: res.data, loggedIn: true });
		});
	};

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
			url: 'http://localhost:8888/server/signIn.php',
			data: params
		}).then(res => {
			localStorage.setItem('mtuFishingAccessToken', user.accessToken);
			localStorage.setItem('mtuFishingUserId', res.data.userId);
			this.getUser();
		});
	};

	render() {
		const { loggedIn, user, userSideMenuVisible, adminSideMenuVisible } = this.state;

		if (loggedIn) {
			return (
				<div>
					<div className="header">
						<div className="headerTitle">MTU Fishing Club Locker</div>
						<input type="text" placeholder="Search Locker" className="searchBox" />
						<div className="headerMenu">
							<div className="headerOption" onClick={() => this.props.history.push('/')}>
								Home
							</div>
							<div className="headerOption">Checkout (0)</div>
							<div
								className="headerOption"
								onClick={() => this.setState({ adminSideMenuVisible: true })}
							>
								<i className="fa fa-cog" />
							</div>
							<div
								className="headerOption"
								onClick={() => this.setState({ userSideMenuVisible: true })}
							>
								<i className="fa fa-user" />
							</div>
						</div>
					</div>

					<UserSideMenu
						visible={userSideMenuVisible}
						userFullName={user.name}
						hideMenu={() => this.setState({ userSideMenuVisible: false })}
					/>

					<AdminSideMenu
						visible={adminSideMenuVisible}
						hideMenu={() => this.setState({ adminSideMenuVisible: false })}
					/>
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
