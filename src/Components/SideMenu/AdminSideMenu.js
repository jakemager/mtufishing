import React, { Component } from 'react';

import './SideMenu.css';

export default class AdminSideMenu extends Component {
	render() {
		const { visible, hideMenu } = this.props;

		if (visible === null) return <span />;

		return (
			<div className={`sideMenuContainer ${visible ? 'visible' : 'hidden'}`}>
				<div className="sideMenuHeader">
					<i className="headerArrow fa fa-arrow-right" onClick={hideMenu} />
					<div className="headerTitle">Manage</div>
				</div>
				<div className="sideMenuOption">Users</div>
				<div className="sideMenuOption">Inventory</div>
				<div className="sideMenuOption">Items</div>
				<div className="sideMenuOption">Images</div>
				<div className="sideMenuOption">Sponsors</div>
			</div>
		);
	}
}
