import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default class AddEditUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newUser: { id: '', name: '', position: '', paid: false, admin: false, boat: false }
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

		let url = '/server/items/newUser.php';
		if (edit) url = '/server/items/updateItem.php';

		let params = new URLSearchParams();
		params.append('item', JSON.stringify(newUser));
		axios({
			method: 'post',
			url: url,
			data: params
		}).then(res => {
			if (res.data === true) {
				this.props.getItems();
				this.setState({ newUser: { image: '', name: '', quantity: '', description: '', id: '' } });
				toast.success(edit ? 'Item edited!' : 'Item created!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
			}
		});
	};

	render() {
		const { cancel } = this.props;
		const { newUser } = this.state;
		const { id, name, position, paid, boat, admin } = this.state.newUser;

		return (
			<div className="addEditUserContainer">
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Email ID</label>
					<input
						className="textInput"
						type="text"
						value={id}
						onChange={e => this.setState({ newUser: { ...newUser, id: e.target.value } })}
					/>
				</div>
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Name</label>
					<input
						className="textInput"
						type="text"
						value={name}
						onChange={e => this.setState({ newUser: { ...newUser, name: e.target.value } })}
					/>
				</div>
				<div className="addEditUserColumn">
					<label className="addEditUserHeader">Position</label>
					<select>
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
				<div className="addEditUserColumn">
					<button onClick={() => this.saveItem()} className="btn editButton">
						Save
					</button>
					<button onClick={cancel} className="btn deleteButton">
						Cancel
					</button>
				</div>
				<ToastContainer />
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
