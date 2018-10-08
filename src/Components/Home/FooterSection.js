import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import './FooterSection.css';

class FooterSection extends Component {
	componentDidMount() {
		const params = new URLSearchParams();
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/confirmUser.php',
			data: params
		}).then(res => {
			console.log(res.data);
		});
	}

	onSignIn = user => {
		console.log(user);

		const params = new URLSearchParams();
		params.append('id_token', user.tokenId);
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/confirmUser.php',
			data: params
		}).then(res => {
			console.log(res.data);
		});
	};

	responseGoogle = response => {
		console.log('res', response);
	};

	render() {
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
				</div>
				<p style={{ paddingTop: 15 }}>Website by Jake Mager</p>
			</div>
		);
	}
}

export default FooterSection;
