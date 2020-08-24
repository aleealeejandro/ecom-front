import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart, removeItem} from './cartHelpers'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {
	const [items, setItems] = useState([])
	const [run, setRun] = useState(false);

	useEffect(() => {
		setItems(getCart())
	}, [run])

	const showItems = items => {
		return(
			<div>
				<h2>Your cart has {`${items.length}`} items</h2>
				<div className="row">
					{items.map((product) => (
						<div key={product._id} className='col-lg-3 col-md-6 col-sm-12'>
							<Card 
								product={product} 
								showAddToCartButton={false} 
								cartUpdate={true}
								showRemoveProductButton={true}
								setRun={setRun}
								run={run}
							/>
						</div>
					))}
				</div>
			</div>
		)
	}

	const noItemsMessage = () => (
		<h2>
			Your cart is empty. <br/><Link to='/shop'>Continue shopping</Link>
		</h2>
	);

	return (
		<Layout title='Shopping Cart' description='Manage your cart items' className='container-fluid'>
			<div>
				{items.length > 0 ? showItems(items) : noItemsMessage()}
			</div>
			<div className='row'>
				<div className='mx-auto w-35'>
					<h2 className="mb-4 mt-5">Cart Summary</h2>
					<Checkout products={items} setRun={setRun} run={run} />
				</div>
			</div>
		</Layout>
	);
}

export default Cart;


			// <div className="container main-section">
			// 	<div className="row">
			// 		<div className="col-lg-12 pb-2">
			// 			<h4>Shoping Cart Design Using Bootstrap 4.0</h4>
			// 		</div>
			// 		<div className="col-lg-12 pl-3 pt-3">
			// 			<table className="table table-hover border bg-white">
			// 		    <thead>
			// 	      	<tr>
			// 		        <th>Product</th>
			// 		        <th>Price</th>
			// 		        <th style="width:10%;">Quantity</th>
			// 		        <th>Subtotal</th>
			// 		        <th>Action</th>
			// 	      	</tr>
			// 		    </thead>
			// 		    <tbody>
			// 	      	<tr>
			// 		        <td>
			// 		        	<div className="row">
			// 								<div className="col-lg-2 Product-img">
			// 									<img src="http://nicesnippets.com/demo/sc-images.jpg" alt="..." className="img-responsive"/>
			// 								</div>
			// 								<div className="col-lg-10">
			// 									<h4 className="nomargin">Lenovo K6 Power</h4>
			// 									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			// 									tempor incididunt ut labore et dolore magna aliqua.</p>
			// 								</div>
			// 							</div>
			// 		        </td>
			// 		        <td> 12,000 </td>
			// 		        <td data-th="Quantity">
			// 							<input type="number" className="form-control text-center" value="1">
			// 						<td>
			// 						<td>12,000</td>
			// 		        <td className="actions" data-th="" style="width:10%;">
			// 							<button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
			// 							<button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>								
			// 						</td>
			// 	      	</tr>
			// 		    </tbody>
			// 		    <tfoot>
			// 					<tr>
			// 						<td><a href="#" className="btn btn-warning text-white"><i className="fa fa-angle-left"></i>Continue Shopping</a></td>
			// 						<td colspan="2" className="hidden-xs"></td>
			// 						<td className="hidden-xs text-center" style="width:10%;"><strong>Total : 47,000</strong></td>
			// 						<td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
			// 					</tr>
			// 				</tfoot>
			// 			</table>
			// 		</div>
			// 	</div>
			// </div>
