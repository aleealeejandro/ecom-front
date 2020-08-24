import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem, updateItem, removeItem} from './cartHelpers'

const Card = ({
	product, 
	showViewProductButton = true, 
	showAddToCartButton = true, 
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = f => f, // default value of function
	run = undefined // default value of undefined
}) => {

	const [redirect, setRedirect] = useState(false)
	const [count, setCount] = useState(product.count)

	const showViewButton = showViewProductButton => {
		return (
			showViewProductButton && (
				<div>
					<Link to={`/product/${product._id}`}>
						<button className="btn btn-outline-primary mt-2 mb-2">
							View Product
						</button>
					</Link>
				</div>
			)
		)
	}

	const addToCart = () => {
		addItem(product, () => {
			setRedirect(true)
		})
	}

	const shouldRedirect = redirect => {
		if(redirect) {
			return <Redirect to='/cart' />
		}
	}

	const showAddToCart = (showAddToCartButton) => {
		return showAddToCartButton && (
			<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
				Add to Cart
			</button>
		)
	}

	const showRemoveButton = (showRemoveProductButton) => {
		return showRemoveProductButton && (
			<button 
				onClick={() => {
					removeItem(product._id)
					setRun(!run) // run useEffect in parent Cart
				}}
					className="btn btn-outline-danger mt-2 mb-2"
			>
				Remove from cart
			</button>
		)
	}

	const showStock = quantity => {
		return quantity > 0 ? (
			<span className='badge badge-primary badge-pill mb-2'>In Stock</span> 
			) : (
			<span className='badge badge-primary badge-pill mb-2'>Out of Stock Stock</span>
			);
	}

	const handleChange = productId => event => {
		setRun(!run); // run useEffect in parent Cart
		setCount(event.target.value < 1 ? 1 : event.target.value)
		if(event.target.value >= 1) {
			updateItem(productId, event.target.value)
		}
	}

	const showCartUpdateOptions = cartUpdate => {
		return cartUpdate && (
			<div className='container text-center'>
				<div className="input-group mb-4">
					<div className="input-group-prepend mr-2">
						<span className="input-group-text">Quantity</span>
					</div>

					<input 
						type="number" 
						className="form-control" 
						value={count} 
						onChange={handleChange(product._id)}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className="card-deck h-100">
			<div className="card bg-primary">
				<div className="card-header lead">{product.name}</div>
				<div className="card-body">
					{shouldRedirect(redirect)}
					<ShowImage item={product} url='product' />
					<p className='lead mt-2'>{product.description.substring(0,100)}</p>
					<p className='black-10'>${product.price}</p>
					<p className='black-9'>Category: {product.category && product.category.name}</p>
					<p className='black-8'>Added {moment(product.createdAt).fromNow()}</p>
					{showStock(product.quantity)}
					<br/>
					{showViewButton(showViewProductButton)}
					{showAddToCart(showAddToCartButton)}
					{showCartUpdateOptions(cartUpdate)}
					{showRemoveButton(showRemoveProductButton)}
				</div>
			</div>
		</div>
	)
}

export default Card;
