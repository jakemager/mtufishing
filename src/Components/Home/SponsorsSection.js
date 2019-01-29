import React, { Component } from 'react';
import axios from 'axios';

import './SponsorSection.css';

export default class sponsorSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sponsors: []
		};

		this.fetchSponsors();
	}

	fetchSponsors = () => {
		axios({
			method: 'get',
			url: '/server/home/getSponsors.php'
		})
			.then(res => {
				this.setState({
					sponsors: res.data
				});
			})
			.catch(err => console.log('error', err));
	};

	render() {
		return (
			<div className="sponsorSection">
				<h2 className="sponsorHeader">Sponsors</h2>
				<div className="sponsorBody">
					{this.state.sponsors.map((sponsor, i) => (
						<div className="sponsorImageContainer" key={i}>
							<a href={sponsor.website} target="_blank">
								<img
									className="sponsorImage"
									src={`/server/sponsors/sponsorImages/${sponsor.image}`}
									alt={sponsor.name}
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		);
	}
}
