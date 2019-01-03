import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import ReactTable from 'react-table';

// import './sponsors.css';
import AddEditSponsor from './AddEditSponsor';
import { ToastContainer, toast } from 'react-toastify';

class Sponsors extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'pending',
			filterBarValue: '',
			sponsors: [],
			editingSponsor: false,
			showAddEdit: false,
			filteredSponsors: [],
			editSponsor: { image: '', name: '', quantity: '', description: '', id: '' }
		};
	}

	componentDidMount() {
		this.getSponsors();
	}

	getSponsors = () => {
		axios({
			method: 'post',
			url: '/server/sponsors/getSponsors.php'
		}).then(res => {
			this.setState({ sponsors: res.data, filteredSponsors: res.data }, this.filterSponsors);
		});
	};

	deleteSponsor = id => {
		let params = new URLSearchParams();
		params.append('Id', id);
		axios({
			method: 'post',
			url: '/server/sponsors/deleteSponsor.php',
			data: params
		}).then(res => {
			if (res.data === true) {
				toast.error('sponsor removed', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});

				this.getSponsors();
			}
		});
	};

	getActions = ({ Id, image, name, website }) => {
		return (
			<div className="actionButtons">
				<button
					onClick={() =>
						this.setState({
							editSponsor: { id: Id, image, name, website },
							editingSponsor: true,
							showAddEdit: true
						})
					}
					className="editButton"
					style={{ marginRight: 5 }}
				>
					Edit
				</button>
				<button onClick={() => this.deleteSponsor(Id)} className="deleteButton">
					Delete
				</button>
			</div>
		);
	};

	filterSponsors = () => {
		const { filterBarValue, sponsors } = this.state;
		let filteredSponsors = [];
		if (filterBarValue.length > 0) {
			filteredSponsors = sponsors.filter(
				sponsor =>
					(!!sponsor.name && sponsor.name.toLowerCase().includes(filterBarValue.toLowerCase())) ||
					(!!sponsor.description &&
						sponsor.description.toLowerCase().includes(filterBarValue.toLowerCase()))
			);
		} else {
			filteredSponsors = [...sponsors];
		}

		this.setState({ filteredSponsors });
	};

	getColumns = () => [
		{
			Header: 'Image',
			accessor: 'image',
			Cell: props => (
				<img
					style={{ width: 75, height: 75, objectFit: 'contain' }}
					src={`/server/sponsors/sponsorImages/${props.value}`}
				/>
			)
		},
		{
			Header: 'Name',
			accessor: 'name'
		},
		{
			Header: 'Website',
			accessor: 'website'
		},
		{
			Header: 'Actions',
			Cell: props => <span className="number">{this.getActions(props.original)}</span>
		}
	];

	cancelEdit = () => {
		this.setState({
			editSponsor: { image: '', name: '', website: '' },
			editingSponsor: false,
			showAddEdit: false
		});
	};

	render() {
		const { filteredSponsors, editSponsor, editingSponsor, showAddEdit } = this.state;

		if (!this.props.user.admin) {
			this.props.history.push('/');
		} else
			return (
				<div>
					<Header history={this.props.history} />
					<div style={{ padding: 10 }}>
						{showAddEdit ? (
							<AddEditSponsor
								editSponsor={editSponsor}
								cancel={this.cancelEdit}
								isEdit={editingSponsor}
								getSponsors={this.getSponsors}
							/>
						) : (
							<div>
								<input
									style={{ height: 34, width: 300, fontSize: 18 }}
									placeholder="Filter sponsors..."
									type="text"
									onChange={e =>
										this.setState({ filterBarValue: e.target.value }, this.filterSponsors)
									}
								/>
								<button
									style={{ float: 'right' }}
									onClick={() => this.setState({ showAddEdit: true })}
									className="editButton"
								>
									New Sponsor
								</button>
							</div>
						)}
					</div>
					<ReactTable
						defaultPageSize={10}
						style={{ textAlign: 'center' }}
						className="-highlight"
						data={filteredSponsors}
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

export default connect(mapStateToProps)(Sponsors);
