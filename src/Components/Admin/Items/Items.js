import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';

import './Items.css';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			items: [],
			filteredItems: []
		};
	}

	componentDidMount() {
		this.getItems();
	}

	componentDidUpdate(prevProps) {}

	getItems = () => {
		axios({
			method: 'post',
			url: '/server/locker/getItems.php'
		}).then(res => {
			this.setState({ items: res.data, filteredItems: res.data });
		});
	};

	getActions = ({ Id }) => {
		return (
			<div className="actionButtons">
				<button onClick={() => this.editItem(Id)} className="editButton">
					Edit
				</button>
				<button onClick={() => this.deleteItem(Id)} className="deleteButton">
					Delete
				</button>
			</div>
		);
	};

	getColumns = () => [
		{
			Header: 'Image',
			accessor: 'image'
		},
		{
			Header: 'Name',
			accessor: 'name'
		},
		{
			Header: 'Description',
			accessor: 'description'
		},
		{
			Header: 'Quanitity',
			accessor: 'quantity'
		},
		{
			Header: 'Actions',
			Cell: props => <span className="number">{this.getActions(props.original)}</span>
		}
	];

	render() {
		const { items } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
			return (
				<div>
					<Header history={this.props.history} />
					<div style={{ padding: 10 }}>
						<input
							style={{ height: 34, width: 300, fontSize: 18 }}
							placeholder="Filter Items..."
							type="text"
						/>
						<button
							style={{ float: 'right' }}
							onClick={() => this.addItem()}
							className="editButton"
						>
							New Item
						</button>
					</div>
					<ReactTable
						defaultPageSize={10}
						style={{ textAlign: 'center' }}
						className="-highlight"
						data={items}
						columns={this.getColumns()}
					/>
				</div>
			);
	}
}

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(mapStateToProps)(Items);
