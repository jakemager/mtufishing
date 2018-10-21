import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import PendingTable from './PendingTable';
import CheckedOutTable from './CheckedOutTable';
import HistoryTable from './HistoryTable';

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
		this.getLogs();
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

	render() {
		const { loading, logs, tab } = this.state;
		if (loading) return <div>Loading</div>;
		return (
			<div>
				<Header history={this.props.history} />
				<div className="tab">
					<button
						className={`tabLinks ${tab === 'pending' && 'active'}`}
						onClick={() => this.setState({ tab: 'pending' })}
					>
						Pending
					</button>
					<button
						className={`tabLinks ${tab === 'checkedOut' && 'active'}`}
						onClick={() => this.setState({ tab: 'checkedOut' })}
					>
						Checked Out
					</button>
					<button
						className={`tabLinks ${tab === 'history' && 'active'}`}
						onClick={() => this.setState({ tab: 'history' })}
					>
						History
					</button>
				</div>
				{tab === 'pending' && <PendingTable logs={logs} getLogs={this.getLogs} />}
				{tab === 'checkedOut' && <CheckedOutTable logs={logs} getLogs={this.getLogs} />}
				{tab === 'history' && <HistoryTable logs={logs} />}
			</div>
		);
	}
}
