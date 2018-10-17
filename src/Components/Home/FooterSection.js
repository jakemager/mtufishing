import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import './FooterSection.css';

class FooterSection extends Component {
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

			this.props.history.push('./members');
		});
	};

	render() {
		const accessToken = localStorage.getItem('mtuFishingAccessToken');

		return (
			<div className="footer">
				<div className="icons">
					<a
						className="icon fa fa-facebook-square"
						href="https://www.facebook.com/TheFishingClubAtMichiganTech/?fref=ts"
					>
						<span />
					</a>
					<a className="icon fa fa-instagram" href="https://www.instagram.com/mtu_fishingclub/">
						<span />
					</a>
					<a className="icon fa fa-envelope" href="kldanko@mtu.edu">
						<span />
					</a>
					{!!accessToken ? (
						<i
							className="icon fa fa-sign-in"
							onClick={() => this.props.history.push('./members')}
						/>
					) : (
						<GoogleLogin
							className="icon fa fa-sign-in"
							style={{
								backgroundColor: 'transparent',
								border: 'none',
								margin: 0,
								padding: 0,
								color: '#fff'
							}}
							clientId="1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com"
							buttonText=""
							onSuccess={this.onSignIn}
							onFailure={this.onSignIn}
						/>
					)}
				</div>
				<p style={{ paddingTop: 15 }}>Website by Jake Mager</p>
			</div>
		);
	}
}

export default FooterSection;
