import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import './WelcomeSection.css';

class WelcomeSection extends Component {
	render() {
		return (
			<div className="welcome">
				<div className="fadeIn">
					<img src={logo} className="logo" alt="logo" />
					<h1 className="welcomeText">Welcome To</h1>
					<h1 className="subWelcomeText">The Fishing Club at Michigan Tech </h1>
					<div className="yeeyeeContainer">
						<div className="yeeyeeBoxContainer">
							<div className="yeeyee">YEEYEE</div>
						</div>
						<div className="yeeyeeLine" />
					</div>
				</div>
			</div>
		);
	}
}

export default WelcomeSection;
