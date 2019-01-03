import React, { Component } from 'react';
import axios from 'axios';

import './InstagramSection.css';

export default class InstagramSection extends Component {
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
		axios({
			method: 'get',
			url:
				'https://api.instagram.com/v1/users/self/media/recent/?access_token=7573298529.5136810.902ba8a4eecd4a9c846e291b9ef83d57'
		})
			.then(res => {
				let instagram = [];
				for (let i = 0; i < 8; i++) instagram.push(res.data.data[i].images.standard_resolution.url);

				this.setState({
					instagram
				});
			})
			.catch(err => console.log('error', err));
	};

	render() {
		const { instagram, showInstaOverlay } = this.state;

		return (
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
		);
	}
}
