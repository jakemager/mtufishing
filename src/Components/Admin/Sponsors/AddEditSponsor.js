import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class AddEditSponsor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newSponsor: { image: '', name: '', website: '', id: '' }
		};
	}

	componentDidMount() {
		if (!!this.props.isEdit) {
			this.setState({ newSponsor: this.props.editSponsor });
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.editSponsor !== this.props.editSponsor) {
			this.setState({ newSponsor: this.props.editSponsor });
		}
	}

	saveItem = () => {
		const { isEdit } = this.props;
		const { newSponsor } = this.state;

		let url = '/server/sponsors/newSponsor.php';
		if (isEdit) url = '/server/sponsors/updateSponsor.php';

		let params = new URLSearchParams();
		params.append('sponsor', JSON.stringify(newSponsor));
		axios({
			method: 'post',
			url: url,
			data: params
		}).then(res => {
			if (res.data === true) {
				this.props.getSponsors();
				this.setState({ newSponsor: { image: '', name: '', website: '', id: '' } });
				toast.success(isEdit ? 'Sponsor edited!' : 'Sponsor created!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
			}
		});
	};

	render() {
		const { cancel } = this.props;
		const { newSponsor } = this.state;
		const { name, website, image } = this.state.newSponsor;

		return (
			<div className="addEditItemContainer">
				<div className="addEditItemColumn">
					<label className="addEditItemHeader">Image</label>
					<img src={`${image}`} style={{ width: 75, height: 75, objectFit: 'contain' }} />
					<input
						type="file"
						accept="image/*"
						onChange={e =>
							this.setState({
								newSponsor: { ...newSponsor, image: URL.createObjectURL(e.target.files[0]) }
							})
						}
						id="file-upload"
						style={{ display: 'none' }}
					/>
					<label
						htmlFor="file-upload"
						className="btn editButton"
						style={{ height: 25, marginTop: 5, paddingTop: 5, borderRadius: 3 }}
					>
						Upload
					</label>
				</div>
				<div className="addEditItemColumn">
					<label className="addEditItemHeader">Name</label>
					<input
						className="textInput"
						type="text"
						value={name}
						onChange={e => this.setState({ newSponsor: { ...newSponsor, name: e.target.value } })}
					/>
				</div>
				<div className="addEditItemColumn">
					<label className="addEditItemHeader">Website</label>
					<input
						className="textInput"
						type="text"
						value={website}
						onChange={e =>
							this.setState({ newSponsor: { ...newSponsor, website: e.target.value } })
						}
					/>
				</div>
				<div className="addEditItemColumn">
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

AddEditSponsor.defaultProps = {
	editItem: undefined,
	isEdit: false
};

AddEditSponsor.propTypes = {
	editItem: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		description: PropTypes.string,
		quantity: PropTypes.int
	}),
	isEdit: PropTypes.bool
};
