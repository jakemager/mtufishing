import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

		// If logs updates
		if (this.props.logs !== prevProps.logs) {
			this.setState({
				logs: this.props.logs.filter(log => !!!log.dateReturned && !!!log.approver)
			});
		}

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
			url: '/server/inventory/approveItem.php',
			data: params
		}).then(res => {
			if (res.data === true) {
				toast.success('Item approved!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});

				this.props.getLogs();
			}
		});
	};

	deleteItem = (Id, itemId) => {
		let params = new URLSearchParams();
		params.append('logId', Id);
		params.append('itemId', itemId);
		axios({
			method: 'post',
			url: '/server/inventory/deleteItem.php',
			data: params
		}).then(res => {
			if (res.data === true) {
				toast.error('Item removed', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});

				this.props.getLogs();
			}
			console.log(res);
		});
	};

	getActions = ({ Id, itemId }) => {
		return (
			<div className="actionButtons">
				<button onClick={() => this.approveItem(Id)} className="approveButton">
					Approve
				</button>
				<button onClick={() => this.deleteItem(Id, itemId)} className="deleteButton">
					Delete
				</button>
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
			<div>
				<ReactTable
					defaultPageSize={12}
					style={{ textAlign: 'center' }}
					className="-striped"
					noDataText="No Pending Items!"
					data={logs}
					columns={this.getColumns()}
				/>
				<ToastContainer />
			</div>
		);
	}
}
