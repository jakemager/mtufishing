import React, { Component } from 'react';
import groupImage from '../assets/images/group2018.jpg';
import boardImage from '../assets/images/board2017.jpg';

import './ClubSection.css';

export default class ClubSection extends Component {
	render() {
		return (
			<div className="clubSection">
				<div className="clubRow">
					<div className="clubConent">
						<h2 className="clubHeader">The Club</h2>
						<p>
							The primary purpose of the Club shall be to encourage camaraderie, sportsmanship,
							integrity, conservation, and development of the skills and knowledge needed to be
							successful anglers. The Fishing Club of Michigan Tech fishes year round in the
							Keweenaw Region and also participates in community service with campus activities and
							local conservation. We encourage our members to better themselves in aspects such as,
							but not limited to, conservation, competitiveness, and involvement. The Club has
							individuals that compete in the FLW collegiate series.
						</p>
					</div>
					<div className="clubConent">
						<img className="clubImage" src={groupImage} alt="Group" />
					</div>
				</div>
				<div className="clubRow">
					<div className="clubConent">
						<img className="clubImage" src={boardImage} alt="Board" />
					</div>
					<div className="clubConent">
						<h2 className="clubHeader">The Board</h2>
						<ul className="boardList">
							<li>
								<strong>President:</strong> Pat Ricchi
							</li>
							<li>
								<strong>Vice President:</strong> Lukas Evans
							</li>
							<li>
								<strong>Treasurer:</strong> Jacob Anderson
							</li>
							<li>
								<strong>Secretary:</strong> Michael Gobeli
							</li>
							<li>
								<strong>Sponsorship:</strong> Kaylynn Foster
							</li>
							<li>
								<strong>Public Relations:</strong> Thomas Gunst
							</li>
							<li>
								<strong>Equipment Manager:</strong> Mike Summerfield&nbsp;
							</li>
							<li>
								<strong>Trip Coordinator:</strong> Matthew Barker
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
