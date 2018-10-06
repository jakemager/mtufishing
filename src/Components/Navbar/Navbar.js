import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<div
				style={{
					padding: '10px',
					width: '40%',
					background: '#f0f0f0'
				}}
			>
				<ul style={{ listStyleType: 'none', padding: 0 }}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/bubblegum">Bubblegum</Link>
					</li>
					<li>
						<Link to="/shoelaces">Shoelaces</Link>
					</li>
				</ul>
			</div>
		);
	}
}
