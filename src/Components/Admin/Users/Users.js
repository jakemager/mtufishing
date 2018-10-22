import React, { Component } from 'react';
import Header from '../Header';

export default class Users extends Component {
	render() {
		return (
			<div>
				<Header history={this.props.history} />
			</div>
		);
	}
}

// getColumns = () => [
// 	{
// 		Header: 'ID',
// 		accessor: 'Id'
// 	},
// 	{
// 		Header: 'Name',
// 		accessor: 'name'
// 	},
// 	{
// 		Header: 'Position',
// 		accessor: 'position'
// 	},
// 	{
// 		Header: 'Paid',
// 		accessor: 'paid'
// 	},
// 	{
// 		Header: 'Admin',
// 		accessor: 'admin'
// 	},
// 	{
// 		Header: 'Boat',
// 		accessor: 'boat'
// 	},
// 	{
// 		Header: 'Actions'
// 	}
// ];
