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
		updatedCategory: '',
		redirectToProfile: false,
		formData: ''
	})


	// destructure user and token from local storage
	const {user, token} = isAuthenticated()

	// deconstruct values from state
	const {
		name,
		loading, 
		error, 
		updatedCategory, 
		redirectToProfile, 
		formData
	} = values;

	const init = categoryId => {
		getCategory(categoryId).then(data => {
			if(data.error) {
				setValues({...values, error: data.error})
			} else {
				// populate the state
				setValues({
					...values,
					name: data.name,
					formData: new FormData()
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
		formData.set(name, value)
		setValues({...values, [name]: value})
	};

	const clickSubmit = event => {
		event.preventDefault();
		setValues({...values, error: '', loading: true});

		updateCategory(match.params.categoryId, user._id, token, formData).then(data => {
			if(data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({
					...values, 
					name: '', 
					loading: false,
					updatedCategory: data.name,
					redirectToProfile: true,
					error: false
				});
			}
		});
	};

	const updateCategoryForm = () => (
		<form className='mb-3' onSubmit={clickSubmit} >
			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Category name</label>
				<input
					type='text'
					className='form-control' 
					onChange={handleChange('name')} 
					value={name}
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
	
	const showSuccess = () => (
		<div className='alert alert-success' style={{display: updatedCategory ? '' : 'none'}}>
			{`${updatedCategory} was updated successfully`}
		</div>
	);

	const showLoading = () => 
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
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
					{showSuccess()}
					{showError()}
					{showLoading()}
					{updateCategoryForm()}
					{redirectUser()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);

};

export default UpdateCategory;
