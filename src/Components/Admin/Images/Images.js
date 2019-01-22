import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default class Images extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageHash: ''
		};
	}

	componentDidMount() {}

	uploadImage = type => {
		const params = new FormData();
		params.append('image', document.getElementById(`imageUpload-${type}`).files[0]);
		params.append('type', type);

		axios({
			method: 'post',
			url: '/server/home/uploadImage.php',
			data: params,
			headers: {
				'content-type': 'multipart/form-data'
			}
		}).then(res => {
			if (res.data === true) {
				toast.success('Board Image Uploaded!', {
					position: 'bottom-right',
					autoClose: 2000,
					closeOnClick: true
				});
				this.setState({ imageHash: Date.now() });
			}
		});
	};

	render() {
		const { imageHash } = this.state;

		return (
			<div>
				<Header history={this.props.history} />
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						margin: 10
					}}
				>
					Highly recommend uploading as .jpg
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						margin: 10
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
						<div
							style={{ flexDirection: 'row', justifyContent: 'center', width: '35vw', height: 250 }}
						>
							<img
								style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								src={`/server/home/images/members.jpeg?${imageHash}`}
							/>
						</div>
						<div style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
							<input
								type="file"
								accept="image/*"
								onChange={e => this.uploadImage('members')}
								id="imageUpload-members"
								style={{ display: 'none' }}
							/>
							<label
								htmlFor="imageUpload-members"
								className="btn editButton"
								style={{ height: 25, marginTop: 5, paddingTop: 5, borderRadius: 3, padding: 5 }}
							>
								Upload Members Image
							</label>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
						<div
							style={{ flexDirection: 'row', justifyContent: 'center', width: '35vw', height: 250 }}
						>
							<img
								style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								src={`/server/home/images/board.jpeg?${imageHash}`}
							/>
						</div>
						<div style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
							<input
								type="file"
								accept="image/*"
								onChange={e => this.uploadImage('board')}
								id="imageUpload-board"
								style={{ display: 'none' }}
							/>
							<label
								htmlFor="imageUpload-board"
								className="btn editButton"
								style={{ height: 25, marginTop: 5, paddingTop: 5, borderRadius: 3, padding: 5 }}
							>
								Upload Board Image
							</label>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		);
	}
}
