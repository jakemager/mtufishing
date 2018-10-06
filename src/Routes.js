import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './Components/Home/Home';
import Members from './Components/Members/Members';

const SidebarExample = ({ location }) => {
	return (
		<div>
			<Switch location={location}>
				<Route exact path={'/'} component={Home} />
				<Route path={'/members'} component={Members} />
			</Switch>
		</div>
	);
};

export default withRouter(SidebarExample);
