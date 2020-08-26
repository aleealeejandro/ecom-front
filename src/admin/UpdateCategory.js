import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import {getCategory, updateCategory} from './apiAdmin';

const UpdateCategory = ({match}) => {
	const [values, setValues] = useState({
		name: '',
		loading: false,
		error: '',
		redirectToProfile: false,
		formData: ''
	})


	// destructure user and token from local storage
	const {user, token} = isAuthenticated()
	const {name, error, redirectToProfile} = values;

	const init = categoryId => {
		getCategory(categoryId, token).then(data => {
			if(data.error) {
				setValues({...values, error: data.error})
			} else {
				// populate the state
				setValues({
					...values,
					name: data.name,
				})
			}
		})
	}
 
	// runs when the compound mounts and theres a change in the state
	useEffect(() => {
		init(match.params.categoryId);
	}, [])

	const handleChange = name => event => {
		const value = event.target.value
		setValues({...values, error: false, [name]: value})
	};

	const clickSubmit = event => {
		event.preventDefault();
		const category = {name: name};

		updateCategory(match.params.categoryId, user._id, token, category)
			.then(data => {
				if(data.error) {
					setValues({...values, error: data.error})
				} else {
					setValues({
						...values, 
						name: '',
						error: false,
						redirectToProfile: true
					});
				}
			});
	};

	const updateCategoryForm = () => (
		<form className='mb-3' onSubmit={clickSubmit} >
			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Category name</label>
				<input
					onChange={handleChange('name')}
          value={name}
          // className="input100"
          type="text"
          required
          name="name"
				/>
			</div>
			<button className='btn btn-outline-primary'>Update Category</button>
		</form>
	);

	const showError = () => (
		<div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	);

	const redirectUser = () => {
		if(redirectToProfile) {
			if(!error) {
				return <Redirect to='/admin/categories' />
			}
		}
	}

	const goBack = () => (
		<div className='mt-5'>
			<Link className='text-warning' to='/admin/dashboard'>Back to Dashboard</Link>
		</div>
	);

	return (
		<Layout title='Update Category' description={`Howdy ${user.name},\u00A0 ready to update a category?`} className='container'>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showError()}
					{updateCategoryForm()}
					{redirectUser()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);

};

export default UpdateCategory;
