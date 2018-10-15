import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Overlays from './Overlays';
import Home from './Components/Home/Home';
import Members from './Components/Members/Members';
import Checkout from './Components/Checkout/Checkout';

const SidebarExample = ({ location }) => {
	return (
		<div>
			<Overlays />
			<Switch location={location}>
				<Route exact path={'/'} component={Home} />
				<Route path={'/members/checkout'} component={Checkout} />
				<Route path={'/members'} component={Members} />
			</Switch>
		</div>
	);
};

export default withRouter(SidebarExample);
