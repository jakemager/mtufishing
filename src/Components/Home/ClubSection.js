import React, { Component } from 'react';
import axios from 'axios';

import './ClubSection.css';

export default class ClubSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			president: '',
			vicePresident: '',
			treasurer: '',
			secretary: '',
			sponsorship: '',
			publicRelations: '',
			equipmentManager: '',
			tripCoordinator: ''
		};

		this.fetchPositions();
	}

	fetchPositions = () => {
		axios({
			method: 'get',
			url: '/server/home/getPositions.php'
		})
			.then(res => {
				this.setState({
					president: !!res.data.filter(o => o.position === 'President')[0]
						? res.data.filter(o => o.position === 'President')[0].name
						: '',
					vicePresident: !!res.data.filter(o => o.position === 'Vice President')[0]
						? res.data.filter(o => o.position === 'Vice President')[0].name
						: '',
					treasurer: !!res.data.filter(o => o.position === 'Treasurer')[0]
						? res.data.filter(o => o.position === 'Treasurer')[0].name
						: '',
					secretary: !!res.data.filter(o => o.position === 'Secretary')[0]
						? res.data.filter(o => o.position === 'Secretary')[0].name
						: '',
					sponsorship: !!res.data.filter(o => o.position === 'Sponsorship')[0]
						? res.data.filter(o => o.position === 'Sponsorship')[0].name
						: '',
					publicRelations: !!res.data.filter(o => o.position === 'Public Relations')[0]
						? res.data.filter(o => o.position === 'Public Relations')[0].name
						: '',
					equipmentManager: !!res.data.filter(o => o.position === 'Equipment Manager')[0]
						? res.data.filter(o => o.position === 'Equipment Manager')[0].name
						: '',
					tripCoordinator: !!res.data.filter(o => o.position === 'Trip Coordinator')[0]
						? res.data.filter(o => o.position === 'Trip Coordinator')[0].name
						: ''
				});
			})
			.catch(err => console.log('error', err));
	};

	render() {
		const {
			president,
			vicePresident,
			treasurer,
			secretary,
			sponsorship,
			publicRelations,
			equipmentManager,
			tripCoordinator
		} = this.state;

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
						<img className="clubImage" src="/server/home/images/members.jpeg" alt="Group" />
					</div>
				</div>
				<div className="clubRow" style={{ marginTop: 45 }}>
					<div className="clubConent">
						<img className="clubImage" src="/server/home/images/board.jpeg" alt="Board" />
					</div>
					<div className="clubConent">
						<h2 className="clubHeader">The Board</h2>
						<ul className="boardList">
							<li>
								<strong>President:</strong> {president}
							</li>
							<li>
								<strong>Vice President:</strong> {vicePresident}
							</li>
							<li>
								<strong>Treasurer:</strong> {treasurer}
							</li>
							<li>
								<strong>Secretary:</strong> {secretary}
							</li>
							<li>
								<strong>Sponsorship:</strong> {sponsorship}
							</li>
							<li>
								<strong>Public Relations:</strong> {publicRelations}
							</li>
							<li>
								<strong>Equipment Manager:</strong> {equipmentManager}
							</li>
							<li>
								<strong>Trip Coordinator:</strong> {tripCoordinator}
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
