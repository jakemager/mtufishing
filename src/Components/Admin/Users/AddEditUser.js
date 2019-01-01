import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default class AddEditUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newUser: { id: '', name: '', position: 'member', paid: false, admin: false, boat: false }
		};
	}

	componentDidMount() {
		if (!!this.props.editUser) {
			this.setState({ newUser: this.props.editUser });
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.editUser !== this.props.editUser) {
			this.setState({ newUser: this.props.editUser });
		}
	}

	saveItem = () => {
		const { edit } = this.props;
		const { newUser } = this.state;

		let error = false;
		let errorMessage = '';

		if (newUser.name.length === 0) {
			error = true;
			errorMessage = 'Name required';
		}

		if (newUser.id.length === 0) {
			error = true;
			errorMessage = 'Email required';
		}

		if (error) {
			toast.error(errorMessage, {
				position: 'bottom-right',
				autoClose: 2000,
				closeOnClick: true
			});

			return;
		}

		let url = '/server/users/newUser.php';
		if (edit) url = '/server/users/updateUser.php';

		let params = new URLSearchParams();
		params.append('user', JSON.stringify(newUser));
		axios({
			method: 'post',
			url: url,
			data: params
		}).then(res => {
			if (res.data === true) {
				this.props.getUsers();
				this.setState({
					newUser: { id: '', name: '', position: 'member', paid: false, admin: false, boat: false }
				});
				toast.success(edit ? 'User edited!' : 'User created!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
			} else if (res.data.includes('Duplicate')) {
				toast.error('Email already exist!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
			} else {
				toast.error('Something went wrong', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
			}
		});
	};

	render() {
		const { cancel, edit } = this.props;
		const { newUser } = this.state;
		const { id, name, position, paid, boat, admin } = this.state.newUser;

		return (
			<div className="addEditUserContainer">
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Email ID</label>
					<input
						disabled={edit}
						className={`textInput ${edit && 'disabled'}`}
						type="text"
						value={id}
						onChange={e =>
							this.setState({
								newUser: { ...newUser, id: e.target.value.toLowerCase().replace(/[^A-Z]/gi, '') }
							})
						}
					/>
				</div>
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Name</label>
					<input
						className="textInput"
						type="text"
						value={name}
						onChange={e =>
							this.setState({
								newUser: { ...newUser, name: e.target.value.replace(/[^A-Za-z ]/gi, '') }
							})
						}
					/>
				</div>
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Position</label>
					<select
						value={position}
						onChange={e => this.setState({ newUser: { ...newUser, position: e.target.value } })}
					>
						<option value="Member">Member</option>
						<option value="Alumni">Alumni</option>
						<option value="President">President</option>
						<option value="Vice President">Vice President</option>
						<option value="Treasurer">Treasurer</option>
						<option value="Sponsorship">Sponsorship</option>
						<option value="Public Relations">Public Relations</option>
						<option value="Equipment Manager">Equipment Manager</option>
						<option value="Trip Coordinator">Trip Coordinator</option>
					</select>
				</div>
				<div className="addEditUserColumn" style={{ width: 60 }}>
					<label className="addEditUserHeader">Paid</label>
					<Toggle
						checked={paid}
						onChange={e => this.setState({ newUser: { ...newUser, paid: !paid } })}
					/>
				</div>
				<div className="addEditUserColumn" style={{ width: 60 }}>
					<label className="addEditUserHeader">Admin</label>
					<Toggle
						checked={admin}
						onChange={e => this.setState({ newUser: { ...newUser, admin: !admin } })}
					/>
				</div>
				<div className="addEditUserColumn" style={{ width: 60 }}>
					<label className="addEditUserHeader">Boat</label>
					<Toggle
						checked={boat}
						onChange={e => this.setState({ newUser: { ...newUser, boat: !boat } })}
					/>
				</div>
				<div className="addEditUserColumn" style={{ width: 35 }}>
					<button onClick={() => this.saveItem()} className="btn editButton">
						Save
					</button>
					<button onClick={cancel} className="btn deleteButton">
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

AddEditUser.defaultProps = {
	editUser: undefined
};

AddEditUser.propTypes = {
	editUser: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		position: PropTypes.string,
		paid: PropTypes.bool,
		admin: PropTypes.bool,
		boat: PropTypes.bool
	})
};
