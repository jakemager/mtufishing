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
		this.setState({ logs: this.props.logs.filter(log => !!!log.dateReturned && !!log.approver) });
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

	getActions = ({ dateReturned }) => {
		return 'Return';
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
			Cell: props => <span className="number">{this.getActions(props)}</span>
		}
	];

	render() {
		const { logs } = this.state;
		return (
			<ReactTable
				defaultPageSize={10}
				style={{ textAlign: 'center' }}
				className="-striped"
				noDataText="No Checked Out Items!"
				data={logs}
				columns={this.getColumns()}
			/>
		);
	}
}
