import React, {useState, useEffect, Fragment} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getCategories, deleteCategory} from './apiAdmin';
import {Table} from 'react-bootstrap'

const ManageCategories = () => {
	const [categories, setCategories] = useState([])

	const loadCategories = () => {
		getCategories().then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setCategories(data)
			}
		})
	}

	const {user, token} = isAuthenticated()

	const destroyCategory = categoryId => {
		deleteCategory(categoryId, user._id, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				loadCategories()
			}
		})
	}

	useEffect(() => {
		loadCategories()
	}, [])

	return (
		<Layout
			title='Manage Categories' 
			description='Create Read Update & Delete Categories'
			className='container-fluid'
		>
			<h2 className="text-center">
				Total Categories: {categories.length}
			</h2>
			<Table striped bordered hover size="sm">
			 <thead>
			    <tr>
			      <th>Category Name</th>
			      <th>Update</th>
			      <th>Delete</th>
			    </tr>
			  </thead>
				{categories.map((category) => (
				  <tbody key={category._id}>
				    <tr>
				      <td>{category.name}</td>
				      <td>
				      	<Link to={`/admin/category/update/${category._id}`}>
									<span className="badge badge-warning badge-pill">
										Update
									</span>
								</Link>
				      </td>
				      <td>
				      	<span onClick={() => destroyCategory(category._id)} className="badge badge-danger badge-pill">
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

export default ManageCategories;










