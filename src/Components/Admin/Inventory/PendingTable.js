import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './Inventory.css';

export default class Inventory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			tab: 'pending',
			logs: [],
			filteredLogs: []
		};
	}

	componentDidMount() {
		this.setState({ logs: this.props.logs.filter(log => !!!log.dateReturned && !!!log.approver) });
	}

	componentDidUpdate(prevProps, prevState) {
		const { filter } = this.props;
		const { logs } = this.state;

		// If user does search
		if (filter !== prevProps.filter) {
			let filteredLogs = [...logs];
			if (filter.length) {
				filteredLogs = logs.filter(log => log.name.toLowerCase().includes(filter.toLowerCase()));
			}
			this.setState({ filteredLogs });
		}
	}

	approveItem = Id => {
		let params = new URLSearchParams();
		params.append('Id', Id);
		params.append('user', localStorage.getItem('mtuFishingUserId'));
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/inventory/approveItem.php',
			data: params
		}).then(res => {
			if (res.data) {
				console.log(res.data);
			}

			console.log(res);
		});
	};

	getActions = ({ Id }) => {
		return (
			<div className="actionButtons">
				<button onClick={() => this.approveItem(Id)} className="approveButton">
					Approve
				</button>
				<button className="deleteButton">Delete</button>
			</div>
		);
	};

	getColumns = () => [
		{
			Header: 'Item',
			accessor: 'itemName'
		},
		{
			Header: 'User',
			accessor: 'user'
		},
		{
			Header: 'Checkout Date',
			accessor: 'checkoutDate'
		},
		{
			Header: 'Return Date',
			accessor: 'returnDate'
		},
		{
			Header: 'Actions',
			Cell: props => <span className="number">{this.getActions(props.original)}</span>
		}
	];

	render() {
		const { logs } = this.state;
		return (
			<ReactTable
				defaultPageSize={10}
				style={{ textAlign: 'center' }}
				className="-striped"
				noDataText="No Pending Items!"
				data={logs}
				columns={this.getColumns()}
			/>
		);
	}
}
