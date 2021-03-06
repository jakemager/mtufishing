import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';

import './Items.css';
import AddEditItem from './AddEditItem';
import { ToastContainer, toast } from 'react-toastify';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			filterBarValue: '',
			items: [],
			editingItem: false,
			showAddEdit: false,
			filteredItems: [],
			editItem: { image: '', name: '', quantity: '', description: '', id: '' }
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
			this.setState({ items: res.data, filteredItems: res.data }, this.filterItems);
		});
	};

	deleteItem = id => {
		let params = new URLSearchParams();
		params.append('Id', id);
		axios({
			method: 'post',
			url: '/server/items/deleteItem.php',
			data: params
		}).then(res => {
			if (res.data === true) {
				toast.error('Item removed', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});

				this.getItems();
			}
		});
	};

	getActions = ({ Id, image, name, quantity, description }) => {
		return (
			<div className="actionButtons">
				<button
					onClick={() => {
						this.setState({
							editItem: { id: Id, image, name, quantity, description },
							editingItem: true,
							showAddEdit: true
						});
						window.scrollTo(0, 0);
					}}
					className="editButton"
					style={{ marginRight: 5 }}
				>
					Edit
				</button>
				<button onClick={() => this.deleteItem(Id)} className="deleteButton">
					Delete
				</button>
			</div>
		);
	};

	filterItems = () => {
		const { filterBarValue, items } = this.state;
		let filteredItems = [];
		if (filterBarValue.length > 0) {
			filteredItems = items.filter(
				item =>
					(!!item.name && item.name.toLowerCase().includes(filterBarValue.toLowerCase())) ||
					(!!item.description &&
						item.description.toLowerCase().includes(filterBarValue.toLowerCase()))
			);
		} else {
			filteredItems = [...items];
		}

		this.setState({ filteredItems });
	};

	getColumns = () => [
		{
			Header: 'Image',
			accessor: 'image',
			Cell: props => (
				<img
					style={{ width: 75, height: 75, objectFit: 'contain' }}
					src={`/server/items/images/${props.value}`}
				/>
			)
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

	cancelEdit = () => {
		this.setState({
			editItem: { image: '', name: '', quantity: '', description: '' },
			editingItem: false,
			showAddEdit: false
		});
	};

	render() {
		const { filteredItems, editItem, editingItem, showAddEdit } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
			return (
				<div>
					<Header history={this.props.history} />
					<div style={{ padding: 10 }}>
						{showAddEdit ? (
							<AddEditItem
								editItem={editItem}
								cancel={this.cancelEdit}
								isEdit={editingItem}
								getItems={this.getItems}
							/>
						) : (
							<div>
								<input
									style={{ height: 34, width: 300, fontSize: 18 }}
									placeholder="Filter Items..."
									type="text"
									onChange={e =>
										this.setState({ filterBarValue: e.target.value }, this.filterItems)
									}
								/>
								<button
									style={{ float: 'right' }}
									onClick={() => this.setState({ showAddEdit: true })}
									className="editButton"
								>
									New Item
								</button>
							</div>
						)}
					</div>
					<ReactTable
						defaultPageSize={10}
						style={{ textAlign: 'center' }}
						className="-highlight"
						data={filteredItems}
						columns={this.getColumns()}
					/>
					<ToastContainer />
				</div>
			);
	}
}

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(mapStateToProps)(Items);
