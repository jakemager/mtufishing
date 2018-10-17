import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { closeSideMenu } from '../../actions/overlays';
import './SideMenu.css';

class AdminSideMenu extends Component {
	navigate = route => {
		this.props.history.push(`/admin/${route}`);
		this.props.closeSideMenu();
	};

	render() {
		const { visible, closeSideMenu } = this.props;

		return (
			<div className={`sideMenuContainer ${visible ? 'visible' : 'hidden'}`}>
				<div className="sideMenuHeader">
					<i className="headerArrow fa fa-arrow-right" onClick={() => closeSideMenu()} />
					<div className="headerTitle">Manage</div>
				</div>
				<div onClick={() => this.navigate('inventory')} className="sideMenuOption">
					Inventory
				</div>
				<div onClick={() => this.navigate('items')} className="sideMenuOption">
					Items
				</div>
				<div onClick={() => this.navigate('users')} className="sideMenuOption">
					Users
				</div>
				<div onClick={() => this.navigate('images')} className="sideMenuOption">
					Images
				</div>
				<div onClick={() => this.navigate('sponsors')} className="sideMenuOption">
					Sponsors
				</div>
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
)(withRouter(AdminSideMenu));
