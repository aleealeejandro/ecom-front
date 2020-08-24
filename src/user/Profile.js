import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import {read, update, updateUser} from './apiUser';

const Profile = (props) => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: false,
		success: false
	})

	const {token} = isAuthenticated()

	const {name, email, password, error, success} = values

	const init = (userId) => {
		// console.log(userId)
		read(userId, token).then(data => {
			if(data.error) {
				setValues({...values, error: true})
			} else {
				setValues({...values, name: data.name, email: data.email})
			}
		})
	}

	useEffect(() => {
		init(props.match.params.userId)
	}, [])

	const handleChange = name => event => {
		setValues({...values, error: false, [name]: event.target.value})
	}

	const clickSubmit = (event) => {
		event.preventDefault()
		update(props.match.params.userId, token, {name, email, password}).then(data => {
			if(data.error) {
				console.log(error)
			} else {
				updateUser(data, () => {
					setValues({
						...values, 
						name: data.name, 
						email: data.email,
						success: true
					})
				})
			}
		}) 
	}

	const redirectUser = success => {
		if(success) {
			return <Redirect to='/cart' />
		}
	}

	const profileUpdate = (name, email, password) => (
		<form>
			<div className="row">
				<div className="col-lg-6">
					<div className="form-group">
						<label className="text-muted">Name</label>
						<input 
							type="text" 
							onChange={handleChange('name')} 
							className='form-control'
							value={name}
						/>
					</div>

					<div className="form-group">
						<label className="text-muted">Email</label>
						<input 
							type="email" 
							onChange={handleChange('email')} 
							className='form-control'
							value={email}
						/>
					</div>

					<div className="form-group">
						<label className="text-muted">Password</label>
						<input 
							type="password" 
							onChange={handleChange('password')} 
							className='form-control'
							value={password}
						/>
						<button onClick={clickSubmit} className="btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		</form>
	)

	return (
		<Layout title='Profile' description='Update your profile' className='container'>
				<h2 className="mt-4 mb-5">Profile Update</h2>
				{profileUpdate(name, email, password)}
				{redirectUser(success)}
		</Layout>
	);
}

export default Profile;
