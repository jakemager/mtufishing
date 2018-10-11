import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import Routes from './Routes';

import './App.css';

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Routes />
				</Router>
			</Provider>
		);
	}
}

export default App;
