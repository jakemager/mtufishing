import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import './Members.css';

export default class Members extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
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
		const { loggedIn } = this.state;

		if (loggedIn) {
			return <div>{JSON.stringify(this.state.user, null, 2)}</div>;
		} else {
			return (
				<GoogleLogin
					className="googleSignIn fa fa-google"
					clientId="1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com"
					buttonText=" Sign in with Google"
					onSuccess={this.onSignIn}
					onFailure={this.onSignIn}
				/>
			);
		}
	}
}
