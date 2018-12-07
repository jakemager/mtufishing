import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddEditItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newItem: { image: '', name: '', quantity: '', description: '' }
		};
	}

	componentDidMount() {
		if (!!this.props.editItem) {
			this.setState({ newItem: this.props.editItem });
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.editItem !== this.props.editItem) {
			this.setState({ newItem: this.props.editItem });
		}
	}

	render() {
		const { cancel } = this.props;
		const { newItem } = this.state;
		const { name, description, quantity, image } = this.state.newItem;

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
								newItem: { ...newItem, image: URL.createObjectURL(e.target.files[0]) }
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
						onChange={e => this.setState({ newItem: { ...newItem, name: e.target.value } })}
					/>
				</div>
				<div className="addEditItemColumn">
					<label className="addEditItemHeader">Description</label>
					<textarea
						className="textInput"
						value={!!description ? description : ''}
						onChange={e => this.setState({ newItem: { ...newItem, description: e.target.value } })}
					/>
				</div>
				<div className="addEditItemColumn">
					<label className="addEditItemHeader">Quantity</label>
					<input
						className="textInput"
						type="text"
						value={quantity}
						onChange={e => this.setState({ newItem: { ...newItem, quantity: e.target.value } })}
					/>
				</div>
				<div className="addEditItemColumn">
					<button onClick={() => this.addItem()} className="btn editButton">
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

AddEditItem.defaultProps = {
	editItem: undefined
};

AddEditItem.propTypes = {
	editItem: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		description: PropTypes.string,
		quantity: PropTypes.int
	})
};
