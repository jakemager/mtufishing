import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovering: false,
			showInfo: false
		};
	}

	render() {
		const { addToCheckout, removeFromCheckout, available, inCart, item } = this.props;
		const { hovering, showInfo } = this.state;

		if (available && !showInfo)
			return (
				<div
					className="itemContainer"
					style={{ backgroundColor: inCart ? '#97db8f' : '#fff' }}
					onMouseEnter={() => this.setState({ hovering: true })}
					onMouseLeave={() => this.setState({ hovering: false })}
				>
					{inCart ? (
						<div className="itemImageContainer">
							<div className="itemImage">
								<i className="inCartIcon fa fa-check" />
								<img
									src={`/server/items/images/${item.image}`}
									style={{ opacity: 0.4 }}
									alt={item.name}
									className="itemImage"
								/>
							</div>
						</div>
					) : (
						<div className="itemImageContainer">
							<img
								src={`/server/items/images/${item.image}`}
								alt={item.name}
								className="itemImage"
							/>
						</div>
					)}

					<div>
						<div className="itemTitle">{item.name}</div>
						<div className="itemAvailability">{item.quantityAvailable} Available</div>
						{hovering && !showInfo ? (
							<div className="itemIconsContainer">
								<i
									onClick={() => this.setState({ showInfo: true })}
									className="itemIcon info fa fa-info"
								/>
								{inCart ? (
									<i
										onClick={() => removeFromCheckout(item.Id)}
										className="itemIcon minus fa fa-minus"
									/>
								) : (
									<i onClick={() => addToCheckout(item)} className="itemIcon plus fa fa-plus" />
								)}
							</div>
						) : (
							<div style={{ marginBottom: 13 }} />
						)}
					</div>
				</div>
			);
		else if (showInfo) {
			return (
				<div className="itemContainer">
					<div className="itemImageContainer">
						{!!item.description ? item.description : 'No description'}
					</div>
					<div className="itemIconsContainer">
						<i
							onClick={() => this.setState({ showInfo: false })}
							className="itemIcon info fa fa-arrow-left"
						/>
					</div>
				</div>
			);
		} else
			return (
				<div
					className="itemContainer"
					style={{ backgroundColor: '#fd868d' }}
					onMouseEnter={() => this.setState({ hovering: true })}
					onMouseLeave={() => this.setState({ hovering: false })}
				>
					<div className="itemImageContainer">
						<div className="itemImage">
							<img
								src={`/server/items/images/${item.image}`}
								alt={item.name}
								className="itemImage"
								style={{ opacity: 0.4 }}
							/>
						</div>
					</div>

					<div>
						<div className="itemTitle">{item.name}</div>
						<div className="itemAvailability" style={{ fontWeight: 500 }}>
							Not Available
						</div>
						{hovering ? (
							<div className="itemIconsContainer">
								<i
									onClick={() => this.setState({ showInfo: true })}
									className="itemIcon info fa fa-info"
								/>
							</div>
						) : (
							<div style={{ marginBottom: 13 }} />
						)}
					</div>
				</div>
			);
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{
		addToCheckout,
		removeFromCheckout
	}
)(Item);
