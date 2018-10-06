import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './Components/Home/Home';

const SidebarExample = ({ location }) => {
	const currentKey = location.pathname.split('/')[1] || '/';
	const timeout = { enter: 500, exit: 500 };
	return (
		<div>
			<Switch location={location}>
				<Route exact path={'/'} component={Home} />
				<Route path={'/bubblegum'} component={() => <h2>OH YES OOH YES</h2>} />
				{/* {routes.map((route, index) => (
					<Route key={index} path={route.path} exact={route.exact} component={route.component} />
				))} */}
			</Switch>
		</div>
	);
};

export default withRouter(SidebarExample);
