import React, { Component } from 'react';

import './InfoSection.css';

export default class infoSection extends Component {
	render() {
		return (
			<div className="infoSection">
				<div className="infoContent">
					<h2 className="infoHeader">What we do</h2>
					<p className="infoText">
						The Fishing Club is one of the biggest clubs at Tech. This club is open to anyone and
						encourages anyone who has any interest in fishing to join. All types of fishing are
						supported and recognized by the club. We meet weekly at 6:00pm Thursdays to discuss
						fishing, future events, and many other things going on with the club. Some perks of
						being in the club include gaining access to tons of awesome fishing equipment. Not only
						that, the club has it's own bass boat that members are also able to take out.
					</p>
				</div>
				<div className="infoContent">
					<h2 className="infoHeader">How to Join</h2>
					<p className="infoText">
						If you are a Michigan Tech student and would like to join the fishing club, it is very
						easy. The club has a membership due of $25; this comes with a club T-shirt and also the
						ability to use all the club equipment. This can be paid to the secretary at one of the
						meetings. The Fishing Club uses involvement link, please sign up there to join the club.
						A link can be found{' '}
						<a href="https://www.involvement.mtu.edu/organization/fish/">HERE</a>. If you are
						skeptical on joining, feel free to come to a meeting first. To learn when the next
						meeting is, please contact the club's public relations.
					</p>
				</div>
			</div>
		);
	}
}
