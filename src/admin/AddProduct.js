import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories} from './apiAdmin';

const AddProduct = () => {
	// destructure user and token from local storage
	const {user, token} = isAuthenticated()
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		categories: [],
		quantity: '',
		sold: '',
		photo: '',
		shipping: '',
		loading: false,
		error: '',
		createdProduct: '',
		redirectToProfile: false,
		formData: ''
	})

	// deconstruct values from state
	const {
		name,
		description, 
		price, 
		category,
		categories,
		quantity, 
		sold, 
		shipping, 
		loading, 
		error, 
		createdProduct, 
		redirectToProfile, 
		formData
	} = values;

	// load categories and set form data
	const init = () => {
		getCategories().then(data => {
			if(data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({
					...values, 
					categories: data, 
					formData: new FormData()
				})
			}
		});
	};

	// runs when the compound mounts and theres a change in the state
	useEffect(() => {
		init();
	}, [])

	const handleChange = name => event => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value
		formData.set(name, value)
		setValues({...values, [name]: value})
	};

	const clickSubmit = event => {
		event.preventDefault();
		setValues({...values, error: '', loading: true});

		createProduct(user._id, token, formData).then(data => {
			if(data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({
					...values, 
					name: '', 
					description: '', 
					photo: '', 
					price: '', 
					quantity: '', 
					loading: false,
					createdProduct: data.name
				});
			}
		});
	};

	const newProductForm = () => (
		<form className='mb-3' onSubmit={clickSubmit} >
			<h4>Post Photo</h4>
			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='btn btn-secondary btn-outline-primary'>
					<input 
						onChange={handleChange('photo')} 
						type='file'
						name='photo' 
						accept='image/*' 
						className='form-control'
						required
					/>
				</label>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Product name</label>
				<input
					type='text'
					className='form-control' 
					onChange={handleChange('name')} 
					value={name}
					autoFocus
					required
				/>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Description</label>
				<textarea
					className='form-control' 
					onChange={handleChange('description')} 
					value={description}
					required
				/>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Price</label>
				<input 
					type='number'
					className='form-control' 
					onChange={handleChange('price')} 
					value={price}
					min='0'
					required
				/>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Category</label>
				<select
					className='form-control' 
					onChange={handleChange('category')} 
					required
				>
					<option value='' hidden>Please select</option>
					{categories && categories.map((c, i) => (
						<option key={i} value={c._id}>{c.name}</option>
					))}
				</select>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Quantity</label>
				<input 
					type='number'
					className='form-control' 
					onChange={handleChange('quantity')} 
					value={quantity}
					min='0'
					required
				/>
			</div>

			<div className=' col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
				<label className='text-muted'>Shipping</label>
				<select 
					className='form-control' 
					onChange={handleChange('shipping')} 
					required
				>
					<option value='' hidden>Please select</option>
					<option value="0">No</option>
					<option value="1">Yes</option>
				</select>
			</div>

			<button className='btn btn-outline-primary'>Create Product</button>
		</form>
	);

	const showError = () => (
		// const error = error.code === 11001 ? {`${name} already exists`} : {''} ;
		<div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	);
	
	const showSuccess = () => (
		<div className='alert alert-success' style={{display: createdProduct ? '' : 'none'}}>
			{`${createdProduct} was created successfully`}
		</div>
	);

	const showLoading = () => (
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		)
	);

	const goBack = () => (
		<div className='mt-5'>
			<Link className='text-warning' to='/admin/dashboard'>Back to Dashboard</Link>
		</div>
	);

	return (
		<Layout title='Add a new product' description={`Howdy ${user.name},\u00A0 ready to add a new product?`} className='container'>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showSuccess()}
					{showError()}
					{showLoading()}
					{newProductForm()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);

};

export default AddProduct;
