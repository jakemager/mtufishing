import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';

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
		this.setState({ logs: this.props.logs.filter(log => !!log.dateReturned) });
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

	getLogs = () => {
		axios({
			method: 'post',
			url: 'http://localhost:8888/server/inventory/getLogs.php'
		}).then(res => {
			this.setState({ logs: res.data, filteredLogs: res.data, loading: false });
		});
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
			Header: 'Approver',
			accessor: 'approver'
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
			Header: 'Date Returned',
			accessor: 'dateReturned'
		},
		{
			Header: 'Returned To',
			accessor: 'returnedTo'
		}
	];

	render() {
		const { logs } = this.state;
		return (
			<ReactTable
				defaultPageSize={10}
				style={{ textAlign: 'center' }}
				className="-highlight"
				data={logs}
				columns={this.getColumns()}
			/>
		);
	}
}
