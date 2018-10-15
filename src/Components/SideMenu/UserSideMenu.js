import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeSideMenu } from '../../actions/overlays';

import './SideMenu.css';

class UserSideMenu extends Component {
	render() {
		const { visible, user, closeSideMenu } = this.props;

		return (
			<div className={`sideMenuContainer ${visible ? 'visible' : 'hidden'}`}>
				<div className="sideMenuHeader">
					<i className="headerArrow fa fa-arrow-right" onClick={() => closeSideMenu()} />
					<div className="headerTitle">{user.name}</div>
				</div>
				<div className="sideMenuOption">Logout</div>
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
)(UserSideMenu);
