import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeSideMenu } from '../../actions/overlays';
import './SideMenu.css';

class AdminSideMenu extends Component {
	render() {
		const { visible, closeSideMenu } = this.props;

		return (
			<div className={`sideMenuContainer ${visible ? 'visible' : 'hidden'}`}>
				<div className="sideMenuHeader">
					<i className="headerArrow fa fa-arrow-right" onClick={() => closeSideMenu()} />
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

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(
	mapStateToProps,
	{ closeSideMenu }
)(AdminSideMenu);
