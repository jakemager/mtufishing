import React, { Component } from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import WelcomeSection from './Home/WelcomeSection';
import ClubSection from './Home/ClubSection';
import InfoSection from './Home/InfoSection';
import InstagramSection from './Home/InstagramSection';
import SponsorsSection from './Home/SponsorsSection';
import FooterSection from './Home/FooterSection';

class App extends Component {
	render() {
		return (
			<div className="App">
				<WelcomeSection />
				<ClubSection />
				<InfoSection />
				<InstagramSection />
				<SponsorsSection />
				<FooterSection />
			</div>
		);
	}
}

export default App;
