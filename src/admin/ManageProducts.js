import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getAllProducts, deleteProduct} from './apiAdmin';
import {Table} from 'react-bootstrap'

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

	// const destroyProductConfirmation = (productId) => (
	//  <button
 //      onClick={e =>
 //        window.confirm(`Are you sure you wish to delete this product?`) &&
 //        destroyProduct(productId)
 //      }
 //    >
 //      Delete Product
 //    </button>
	// )

	useEffect(() => {
		loadProducts()
	}, [])

	return (
		<Layout
			title='Manage Products' 
			description='Create Read Update & Delete Products'
			className='container-fluid'
		>
			<h2 className="text-center">
				Total Products: {products.length}
			</h2>
			<Table striped bordered hover size="sm">
			 <thead>
			    <tr>
			      <th>Product Name</th>
			      <th>Update</th>
			      <th>Delete</th>
			    </tr>
			  </thead>
				{products.map((product) => (
				  <tbody key={product._id}>
				    <tr>
				      <td>{product.name}</td>
				      <td>
				      	<Link to={`/admin/product/update/${product._id}`}>
									<span className="badge badge-warning badge-pill">
										Update
									</span>
								</Link>
				      </td>
				      <td>
								<span onClick={() => 
									window.confirm(`Are you sure you wish to delete ${product.name}?`) &&
        					destroyProduct(product._id)
        					} 
        					className="badge badge-danger badge-pill">
									Delete
								</span>
				      </td>
				    </tr>
				  </tbody>
				))}
			</Table>
		</Layout>
	);
}

export default ManageProducts;
