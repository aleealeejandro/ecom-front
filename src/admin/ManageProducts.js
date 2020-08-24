import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getAllProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {
	const [products, setProducts] = useState([])

	const loadProducts = () => {
		getAllProducts().then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setProducts(data)
			}
		})
	}

	const {user, token} = isAuthenticated()

	const destroyProduct = productId => {
		deleteProduct(productId, user._id, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				loadProducts()
			}
		})
	}

	useEffect(() => {
		loadProducts()
	}, [])

	return (
		<Layout
			title='Manage Products' 
			description='Create Read Update & Delete Products'
			className='container-fluid'
		>
			<div className="row">
				<div className='col-5 text-center'>
					<h2 className="text-center">
						Total products: {products.length}
					</h2>
					<ul className="list-group">
						{products.map((product) => (
							<li 
								key={product._id} 
								className="list-group-item d-flex  align-items-center"
							>
								<strong>{product.name}</strong>
								<Link to={`/admin/product/update/${product._id}`}>
									<span className="badge badge-warning badge-pill">
										Update
									</span>
								</Link>
								<span onClick={() => destroyProduct(product._id)} className="badge badge-danger badge-pill">
									Delete
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
}

export default ManageProducts;
