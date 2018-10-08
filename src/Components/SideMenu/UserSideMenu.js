import React, { Component } from 'react';

import './SideMenu.css';

export default class UserSideMenu extends Component {
	render() {
		const { visible, userFullName, hideMenu } = this.props;

		if (visible === null) return <span />;

		return (
			<div className={`sideMenuContainer ${visible ? 'visible' : 'hidden'}`}>
				<div className="sideMenuHeader">
					<i className="headerArrow fa fa-arrow-right" onClick={hideMenu} />
					<div className="headerTitle">{userFullName}</div>
				</div>
				<div className="sideMenuOption">Logout</div>
			</div>
		);
	}
}
