import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import 'react-table/react-table.css';

import PendingTable from './PendingTable';
import CheckedOutTable from './CheckedOutTable';
import HistoryTable from './HistoryTable';

import './Inventory.css';

class Inventory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			logs: [],
			filteredLogs: []
		};
	}

	componentDidMount() {
		this.getLogs();
	}

	componentDidUpdate(prevProps) {
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
			this.setState({ logs: res.data, filteredLogs: res.data });
		});
	};

	render() {
		const { logs, tab } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
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

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(mapStateToProps)(Inventory);
