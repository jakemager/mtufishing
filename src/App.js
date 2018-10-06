import React, { Component } from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './Routes';

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Routes />
			</Router>
		);
	}
}

export default App;
