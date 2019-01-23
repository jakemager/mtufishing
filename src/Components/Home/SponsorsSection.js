import React, { Component } from 'react';
import axios from 'axios';

import './SponsorSection.css';

export default class sponsorSection extends Component {
	render() {
		return (
			<div className="sponsorSection">
				<h2 className="sponsorHeader">Sponsors</h2>
				<div className="sponsorBody">
					<div className="sponsorImageContainer">
						<img className="sponsorImage" src="http://mtufishing.club/images/sponsors/ig.png" />
					</div>
					<div className="sponsorImageContainer">
						<img
							className="sponsorImage"
							src="http://mtufishing.club/images/sponsors/troutUnlimited.png"
						/>
					</div>
					<div className="sponsorImageContainer">
						<img
							className="sponsorImage"
							src="http://mtufishing.club/images/sponsors/kustomkicker.png"
						/>
					</div>
					<div className="sponsorImageContainer">
						<img
							className="sponsorImage"
							src="http://mtufishing.club/images/sponsors/lowrance.png"
						/>
					</div>
					<div className="sponsorImageContainer">
						<img className="sponsorImage" src="http://mtufishing.club/images/sponsors/mepps.png" />
					</div>
					<div className="sponsorImageContainer">
						<img
							className="sponsorImage"
							src="http://mtufishing.club/images/sponsors/Napoleon-Livestock.png"
						/>
					</div>
					<div className="sponsorImageContainer">
						<img className="sponsorImage" src="http://mtufishing.club/images/sponsors/lews.png" />
					</div>
					<div className="sponsorImageContainer">
						<img
							className="sponsorImage"
							src="http://mtufishing.club/images/sponsors/wildernessSports.png"
						/>
					</div>
				</div>
			</div>
		);
	}
}
