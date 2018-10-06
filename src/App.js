import React, { Component } from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import WelcomeSection from './Home/WelcomeSection';
import ClubSection from './Home/ClubSection';
import InfoSection from './Home/InfoSection';
import SponsorsSection from './Home/SponsorsSection';
import FooterSection from './Home/FooterSection';

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
				<WelcomeSection />
				<ClubSection />
				<InfoSection />
				<div
					className="instagramSection"
					onClick={() => window.open('https://www.instagram.com/mtu_fishingclub/', '_blank')}
				>
					<div
						onMouseEnter={() => this.setState({ showInstaOverlay: true })}
						style={{ display: showInstaOverlay ? '' : 'none' }}
						className="instagramLogoContainer"
					>
						<img
							alt="Instagram Logo"
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
				<SponsorsSection />
				<FooterSection />
			</div>
		);
	}
}

export default App;
