import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserSideMenu from './Components/SideMenu/UserSideMenu';
import AdminSideMenu from './Components/SideMenu/AdminSideMenu';

class Overlays extends Component {
	render() {
		const { sidemenu } = this.props;
		return (
			<div>
				<UserSideMenu visible={sidemenu === 'user'} />
				<AdminSideMenu visible={sidemenu === 'admin'} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sidemenu: state.overlays.sidemenu
});

export default connect(
	mapStateToProps,
	{}
)(Overlays);
