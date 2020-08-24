import React, {useState, useEffect} from 'react';
import {getProducts, getBraintreeClientToken, processPayment, createOrder} from './apiCore'
import Card from './Card'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelpers'

const Checkout = ({products, setRun = f => f, run = undefined}) => {
	const [data, setData] = useState({
		loading:false,
		success: false,
		clientToken: null,
		error: '',
		instance: {},
		address: ''
	})

	const userId = isAuthenticated() && isAuthenticated().user._id
	const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
	    if(data.error) {
        console.log(data.error);
        setData({...data, error: data.error});
	    } else {
        // console.log(data);
        setData({clientToken: data.clientToken});
	    }
    });
  };

	useEffect(() => {
		getToken(userId, token)
	}, [])

	const handleAddress = event => {
		setData({...data, address: event.target.value})
	}

	const getTotal = () => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price
		}, 0)
	}
	
	const showCheckout = () => {
		return isAuthenticated() ? (
			<div>{showDropIn()}</div>
		) : (
			<Link to='/signin'>
				<button className="btn btn-outline-primary">
					Sign in to checkout
				</button>
			</Link>
		)
	}

	let deliveryAddress = data.address;

	const buy = () => {
		setData({loading: true})
		// send the nonce to the server
		// nonce = data.instance.requestPaymentMethod()
		let nonce;
		let getNonce = data.instance.requestPaymentMethod()
			.then(data => {
				// console.log(data)
				nonce = data.nonce
				// once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
				// and also total to be charged
				// console.log('send nonce and total to process: ', nonce, getTotal(products))
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getTotal(products)
				}

				processPayment(userId, token, paymentData)
					.then(response => {
						console.log('payment success', response)
						// empty cart
						// create order
						const createOrderData = {
							products: products,
							transaction_id: response.transaction.id,
							amount: response.transaction.amount,
							address: deliveryAddress
						}

						createOrder(userId, token, createOrderData)
							.then(response => {
								emptyCart(() => {
									setRun(!run) // run useEffect in parent Cart
									console.log('payment success and cart emptied')
									setData({
										loading: false,
										success: true
									})
								})
							})
							.catch(error => {
								console.log('error from createOrder in Checkout.js', error)
								setData({loading: false})
							})
					})
					.catch(error => {
						console.log('error payment denied', error)
						setData({loading: false})
					})
			})
			.catch(error => {
				console.log('dropin error: ', error)
				setData({...data, error: error.message})
			})
	}

	const showDropIn = () => (
		<div onBlur={() => setData({...data, error: ''})}>
			{data.clientToken !== null && products.length > 0 ? (
				<div>
					<div className="gorm-group mb-3 mt-3">
						<label className="text-muted">Delivery Address:</label>
						<textarea 
							onChange={handleAddress} 
							className="form-control"
							value={data.address}
							placeholder='Type your delivery address here'
						/>
					</div>
					<DropIn options={{
						authorization: data.clientToken,
						paypal: {
							flow: 'vault'
						},
						venmo: true
					}} onInstance={instance => (data.instance = instance)}
					/>
					<button onClick={buy} className="btn btn-block btn-outline-success">Pay</button>
				</div>
			) : null}
		</div>
	)

	const showError = error => (
		<div 
			className="alert alert-danger" 
			style={{display: error ? '' : 'none'}}
		>
			{error}
		</div>
	)

	const showSuccess = success => (
		<div 
			className="alert alert-info" 
			style={{display: success ? '' : 'none'}}
		>
			Payment successful
		</div>
	)

	const showLoading = loading => (
		<div 
			className="alert alert-info" 
			style={{display: loading ? '' : 'none'}}
		>
			Loading...
		</div>
	)

	return (
		<div>
			{showLoading(data.loading)}
			{showError(data.error)}
			{showSuccess(data.success)}
			<h4>Total: ${getTotal()}</h4>
			{showCheckout()}
		</div>
	)

}

export default Checkout;













