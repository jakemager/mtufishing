import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserSideMenu from './Components/SideMenu/UserSideMenu';
import AdminSideMenu from './Components/SideMenu/AdminSideMenu';

class Overlays extends Component {
	render() {
		const { sidemenu, history } = this.props;
		return (
			<div>
				<UserSideMenu history={history} visible={sidemenu === 'user'} />
				<AdminSideMenu history={history} visible={sidemenu === 'admin'} />
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
