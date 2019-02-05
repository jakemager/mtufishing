import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCheckout, removeFromCheckout } from '../../actions/lockerRoom';

class MobileItem extends Component {
	render() {
		const { addToCheckout, removeFromCheckout, available, inCart, item } = this.props;

		if (available)
			return (
				<div className="itemContainer" style={{ backgroundColor: inCart ? '#97db8f' : '#fff' }}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<img
							src={`/server/items/images/${item.image}`}
							style={{ opacity: inCart ? 0.4 : 1 }}
							alt={item.name}
							className="itemImage"
						/>

						<div style={{ paddingLeft: 15, maxWidth: '50vw' }}>
							<div className="itemTitle">{item.name}</div>
							<div className="itemAvailability">{item.quantityAvailable} Available</div>
						</div>
					</div>
					<div className="itemIconsContainer">
						{inCart ? (
							<i
								onClick={() => removeFromCheckout(item.Id)}
								className="itemIcon minus fa fa-minus"
								style={{ background: '#ac0202' }}
							/>
						) : (
							<i onClick={() => addToCheckout(item)} className="itemIcon plus fa fa-plus" />
						)}
					</div>
				</div>
			);
		else
			return (
				<div className="itemContainer" style={{ backgroundColor: '#fd868d' }}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
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

						<div style={{ paddingLeft: 15 }}>
							<div className="itemTitle">{item.name}</div>
							<div className="itemAvailability" style={{ fontWeight: 500 }}>
								Not Available
							</div>
						</div>
					</div>
					<div className="itemIconsContainer">
						<i
							onClick={() => removeFromCheckout(item.Id)}
							className="itemIcon"
							style={{ background: 'transparent', padding: 25 }}
						/>
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
)(MobileItem);
