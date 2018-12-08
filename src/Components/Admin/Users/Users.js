import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import AddEditUser from './AddEditUser';

import './Users.css';

class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			editingUser: false,
			users: [],
			filteredUsers: [],
			filterBarValue: '',
			editUser: { id: '', name: '', position: 'member', paid: false, admin: false, boat: false }
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	componentDidUpdate(prevProps) {}

	getUsers = () => {
		axios({
			method: 'post',
			url: '/server/users/getUsers.php'
		}).then(res => {
			this.setState({ users: res.data, filteredUsers: res.data });
		});
	};

	getActions = ({ Id, name, position, paid, admin, boatPrivilges }) => {
		return (
			<div className="actionButtons">
				<button
					onClick={() =>
						this.setState({
							editUser: {
								id: Id,
								name,
								position,
								paid: paid === '1',
								admin: admin === '1',
								boat: boatPrivilges === '1'
							},
							editingUser: true
						})
					}
					className="editButton"
					style={{ marginRight: 5 }}
				>
					Edit
				</button>
				<button onClick={() => this.deleteUser(Id)} className="deleteButton">
					Delete
				</button>
			</div>
		);
	};

	getColumns = () => [
		{
			Header: 'ID',
			accessor: 'Id'
		},
		{
			Header: 'Name',
			accessor: 'name'
		},
		{
			Header: 'Position',
			accessor: 'position'
		},
		{
			Header: 'Paid',
			accessor: 'paid',
			Cell: props =>
				props.original.paid == '1' ? <i className="fa-check fa" /> : <i className="fa-times fa" />
		},
		{
			Header: 'Admin',
			accessor: 'admin',
			Cell: props =>
				props.original.admin == '1' ? <i className="fa-check fa" /> : <i className="fa-times fa" />
		},
		{
			Header: 'Boat',
			accessor: 'boatPrivilges',
			Cell: props =>
				props.original.boatPrivilges == '1' ? (
					<i className="fa-check fa" />
				) : (
					<i className="fa-times fa" />
				)
		},
		{
			Header: 'Actions',
			Cell: props => <span className="number">{this.getActions(props.original)}</span>
		}
	];

	filterUsers = () => {
		const { filterBarValue, users } = this.state;
		let filteredUsers = [];
		if (filterBarValue.length > 0) {
			filteredUsers = this.state.filteredUsers.filter(
				user =>
					(!!user.name && user.name.toLowerCase().includes(filterBarValue.toLowerCase())) ||
					(!!user.Id && user.Id.toLowerCase().includes(filterBarValue.toLowerCase())) ||
					(!!user.position && user.position.toLowerCase().includes(filterBarValue.toLowerCase()))
			);
		} else {
			filteredUsers = [...users];
		}

		this.setState({ filteredUsers });
	};

	cancelEdit = () => {
		this.setState({
			editUser: { id: '', name: '', position: 'member', paid: false, admin: false, boat: false },
			editingUser: false
		});
	};

	render() {
		const { filteredUsers, editUser, editingUser } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
			return (
				<div>
					<Header history={this.props.history} />
					<div style={{ padding: 10 }}>
						{editingUser ? (
							<AddEditUser
								editUser={editUser}
								cancel={this.cancelEdit}
								edit={editingUser}
								getUsers={this.getUsers}
							/>
						) : (
							<div>
								<input
									style={{ height: 34, width: 300, fontSize: 18 }}
									placeholder="Filter Users..."
									type="text"
									onChange={e =>
										this.setState({ filterBarValue: e.target.value }, this.filterUsers)
									}
								/>
								<button
									style={{ float: 'right' }}
									onClick={() => this.setState({ editingUser: true })}
									className="editButton"
								>
									New User
								</button>
							</div>
						)}
					</div>
					<ReactTable
						defaultPageSize={10}
						style={{ textAlign: 'center' }}
						className="-highlight"
						data={filteredUsers}
						columns={this.getColumns()}
					/>
				</div>
			);
	}
}

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(mapStateToProps)(Users);
