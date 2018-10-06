import React, { Component } from 'react';

import WelcomeSection from './WelcomeSection';
import ClubSection from './ClubSection';
import InfoSection from './InfoSection';
import InstagramSection from './InstagramSection';
import SponsorsSection from './SponsorsSection';
import FooterSection from './FooterSection';

export default class index extends Component {
	render() {
		return (
			<div className="App">
				<WelcomeSection />
				<ClubSection />
				<InfoSection />
				<InstagramSection />
				<SponsorsSection />
				<FooterSection history={this.props.history} />
			</div>
		);
	}
}
