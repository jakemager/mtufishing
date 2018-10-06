import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import './FooterSection.css';

class FooterSection extends Component {
	onSignIn = user => {
		console.log('ID Token: ', user);

		fetch('http://localhost:8888/server/confirmUser.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id_token: user.tokenId
			})
		})
			.then(resp => resp.json()) // Transform the data into json
			.then(function(data) {
				// Create and append the li's to the ul
				console.log('data', data.name);
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
					<a
						className="icon fa fa-instagram"
						href="https://www.facebook.com/TheFishingClubAtMichiganTech/?fref=ts"
					>
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
				Website by Jake Mager
			</div>
		);
	}
}

export default FooterSection;
