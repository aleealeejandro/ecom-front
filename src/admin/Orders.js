import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
	const [orders, setOrders] = useState([])
	const [statusValues, setStatusValues] = useState([])

	const {user, token} = isAuthenticated()

	const loadOrders = () => {
		listOrders(user._id, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setOrders(data)
			}
		})
	}

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setStatusValues(data)
			}
		})
	}

	useEffect(() => {
		loadOrders()
		loadStatusValues()
	}, [])

	const showOrdersLength = () => {
		if(orders.length > 0) {
			return (
				<h6 className='text-danger display-2'>Total Orders: {orders.length}</h6>
			)
		}
		else {
			return <h6 className="text-danger">No Orders</h6>
		}
	}

	const showInput = (key, value) => (
		<div className="input-group mb-2 mr-sm-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
			</div>
			<input 
				type="text" 
				value={value} 
				className="form-control" 
				readOnly
			/>
		</div>
	)

	const handleStatusChange = (event, orderId) => {
		updateOrderStatus(user._id, token, orderId, event.target.value).then(data => {
			if(data.error) {
				console.log('status update failed')
			} else {
				loadOrders()
			}
		})
	}

	const showStatus = (order) => (
		<div className="form-group">
			<h5 className="mb-4">Status: {order.status}</h5>
			<select 
				onChange={(event) => handleStatusChange(event, order._id)} 
				className='form-control'
			>
				<option value='' hidden>Update Status</option>
				{statusValues.map((status, index) => (
					<option key={index} value={status}>
						{status}
					</option>
				))}
			</select>
		</div>
	)

	return (
		<Layout title='Orders' description={`Howdy ${user.name},\u00A0 manage orders here`} className='container'>
			<div className="row container-fluid">
				<div className="col-md-8 offset-md-2">
					{showOrdersLength()}
					{orders.map((order) => {
						return (
							<div 
								className="mt-5"
								key={order._id}
								style={{borderBottom: '5px solid black'}}
							>
								<h4 className="mb-5">
									<span className="bg-primary">Order ID: {order._id}</span>
								</h4>

								<ul className="list-group mb-2">
									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										{showStatus(order)}
									</li>

									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										Transaction ID: {order.transaction_id}
									</li>

									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										Amount: ${order.amount}
									</li>

									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										Ordered by: {order.user.name}
									</li>

									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										Ordered on: {moment(order.createdAt).fromNow()}
									</li>

									<li 
										className="list-group-item" 
										style={{padding: '20px', border: '1px solid black'}}
									>
										Delivery Address: {order.address}
									</li>
								</ul>

								<h3 className="mt-4 mb-4">
									Total Products in Order: {order.products.length}
								</h3>

								{order.products.map((product) => (
									<div 
										className="mb-4" 
										key={product._id}
										style={{padding: '20px', border: '1px solid black'}}
									>
										{showInput('Product name: \u00A0', product.name)}
										{showInput('Product price: \u00A0$', product.price)}
										{showInput('Product total:\u00A0 ', product.count)}
										{showInput('Product Id: \u00A0', product._id)}
									</div>
								))}
							</div>
						)
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Orders
