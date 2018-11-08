import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import logo from './assets/images/logo.png';
import axios from 'axios';

import Overlays from './Overlays';
import Home from './Components/Home/Home';
import Members from './Components/Members/Members';
import Checkout from './Components/Checkout/Checkout';

import AdminInventory from './Components/Admin/Inventory/Inventory';
import AdminItems from './Components/Admin/Items/Items';
import AdminSponsors from './Components/Admin/Sponsors/Sponsors';
import AdminImages from './Components/Admin/Images/Images';
import AdminUsers from './Components/Admin/Users/Users';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

const auth = {
	isAuthenticated: false,
	authenticate(callback) {
		this.isAuthenticated = true;
		callback();
	},
	signout(callback) {
		this.isAuthenticated = false;
		callback();
	}
};

class Login extends React.Component {
	state = {
		redirectToReferrer: false
	};

	componentDidMount() {
		this.checkToken();
	}

	checkToken = () => {
		const params = new URLSearchParams();
		params.append('accessToken', localStorage.getItem('mtuFishingAccessToken'));
		axios({
			method: 'post',
			url: '/server/login/verifyToken.php',
			data: params
		}).then(() => {
			auth.authenticate(() => {
				this.setState(() => ({
					redirectToReferrer: true
				}));
			});
		});
	};

	onSignIn = user => {
		if (!!user.error) {
			console.error(user);
			return;
		}

		const params = new URLSearchParams();
		params.append('idToken', user.tokenId);
		params.append('expiresAt', user.tokenObj.expires_at);
		params.append('accessToken', user.accessToken);
		axios({
			method: 'post',
			url: '/server/login/signIn.php',
			data: params
		}).then(res => {
			localStorage.setItem('mtuFishingAccessToken', user.accessToken);
			localStorage.setItem('mtuFishingUserId', res.data.userId);

			auth.authenticate(() => {
				this.setState(() => ({
					redirectToReferrer: true
				}));
			});
		});
	};

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer === true) {
			return <Redirect to={from} />;
		}

		return (
			<div className="notLoggedInContainer">
				<div className="notLoggedInInner">
					<img src={logo} className="notLoggedInLogo" alt="logo" />
					<GoogleLogin
						className="googleSignIn fa fa-google"
						clientId="1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com"
						buttonText=" Sign in with Google"
						onSuccess={this.onSignIn}
						onFailure={this.onSignIn}
					/>
				</div>
			</div>
		);
	}
}

export default function Routes() {
	return (
		<Router>
			<div>
				<Overlays />
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<PrivateRoute exact path="/members" component={Members} />
				<PrivateRoute path="/members/checkout" component={Checkout} />
				<PrivateRoute path="/admin/inventory" component={AdminInventory} />
				<Route exact path="/admin" component={Login} />
				<PrivateRoute path="/admin/items" component={AdminItems} />
				<PrivateRoute path="/admin/images" component={AdminImages} />
				<PrivateRoute path="/admin/sponsors" component={AdminSponsors} />
				<PrivateRoute path="/admin/users" component={AdminUsers} />
			</div>
		</Router>
	);
}
