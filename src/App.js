import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instagram: []
		};
	}

	componentDidMount() {
		this.fetchInstagram();
	}

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

	fetchInstagram = () => {
		fetch(
			'https://api.instagram.com/v1/users/self/media/recent/?access_token=7573298529.5136810.902ba8a4eecd4a9c846e291b9ef83d57'
		)
			.then(resp => resp.json())
			.then(res => {
				let instagram = [];
				for (let i = 0; i < 8; i++) instagram.push(res.data[i].images.standard_resolution.url);

				this.setState({
					instagram
				});
			})
			.catch(err => console.log('error', err));
	};

	render() {
		const { instagram, showInstaOverlay } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<div className="clubSection">
					<p>FUCK</p>
				</div>
				<div className="instagramSection">
					<div
						onMouseEnter={() => this.setState({ showInstaOverlay: true })}
						style={{ display: showInstaOverlay ? '' : 'none' }}
						className="instagramLogoContainer"
						onClick={() => window.open('https://www.instagram.com/mtu_fishingclub/', '_blank')}
					>
						<img
							className="instagramLogo"
							src="https://miamimusicproject.org/wp-content/uploads/2017/10/2475.new-instagram-text-logo.png"
						/>
					</div>
					<div
						onMouseLeave={() => this.setState({ showInstaOverlay: false })}
						className="instagramsectionOverlay"
						style={{ display: showInstaOverlay ? '' : 'none' }}
					/>
					{instagram.map((url, i) => (
						<div
							onMouseEnter={() => this.setState({ showInstaOverlay: true })}
							className="instagramImg"
							key={i}
							style={{ backgroundImage: `url(${url})` }}
						/>
					))}
				</div>
				<GoogleLogin
					clientId="1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={this.onSignIn}
					onFailure={this.onSignIn}
				/>{' '}
			</div>
		);
	}
}

export default App;
