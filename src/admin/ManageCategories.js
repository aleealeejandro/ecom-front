import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getCategories, deleteCategory} from './apiAdmin';

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
			<div className="row">
				<div className='col-5 text-center'>
					<h2 className="text-center">
						Total Categories: {categories.length}
					</h2>
					<ul className="list-group">
						{categories.map((category) => (
							<li 
								key={category._id} 
								className="list-group-item d-flex  align-items-center"
							>
								<strong>{category.name}</strong>
								<Link to={`/admin/category/update/${category._id}`}>
									<span className="badge badge-warning badge-pill">
										Update
									</span>
								</Link>
								<span onClick={() => destroyCategory(category._id)} className="badge badge-danger badge-pill">
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

export default ManageCategories;
