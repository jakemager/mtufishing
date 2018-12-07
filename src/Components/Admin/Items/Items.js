import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';

import './Items.css';
import AddEditItem from './AddEditItem';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			items: [],
			editingItem: false,
			filteredItems: [],
			editItem: { image: '', name: '', quantity: '', description: '' }
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

	getActions = ({ Id, image, name, quantity, description }) => {
		return (
			<div className="actionButtons">
				<button
					onClick={() =>
						this.setState({
							editItem: { id: Id, image, name, quantity, description },
							editingItem: true
						})
					}
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
			filteredItems = this.state.filteredItems.filter(
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
				<img style={{ width: 75, height: 75, objectFit: 'contain' }} src={`/${props.value}`} />
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
			editingItem: false
		});
	};

	render() {
		const { filteredItems, editItem, editingItem } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
			return (
				<div>
					<Header history={this.props.history} />
					<div style={{ padding: 10 }}>
						{editingItem ? (
							<AddEditItem editItem={editItem} cancel={this.cancelEdit} />
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
									onClick={() => this.setState({ editingItem: true })}
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
				</div>
			);
	}
}

const mapStateToProps = state => ({
	user: state.user.user
});

export default connect(mapStateToProps)(Items);
