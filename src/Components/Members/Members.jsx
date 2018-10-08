import React, { Component } from 'react';

export default class Members extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		};
	}

	componentDidMount() {
		fetch('http://localhost:8888/server/getuser.php', {
			credientials: 'omit'
		})
			.then(resp => resp.json()) // Transform the data into json
			.then(data => {
				this.setState({ user: data });
			});
	}

	render() {
		return <div>{JSON.stringify(this.state.user, null, 2)}</div>;
	}
}
