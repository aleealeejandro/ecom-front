import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
	
	const {user: {_id, name, email, role}} = isAuthenticated();

	const adminLinks = () => {
		return (
			<div className="card">
				<h4 className="card-header">Admin Links</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className='nav-link' to='/admin/create/category'>Create Category</Link>
					</li>

					<li className="list-group-item">
						<Link className='nav-link' to='/admin/create/product'>Create Product</Link>
					</li>

					<li className="list-group-item">
						<Link className='nav-link' to='/admin/orders'>View Orders</Link>
					</li>

					<li className="list-group-item">
						<Link className='nav-link' to='/admin/products'>Manage Products</Link>
					</li>
				</ul>
			</div>
		)
	};

	const adminInfo = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">User Info</h3>
				<ul className="list-group">
					<li className="list-group-item">{name}</li>
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
				</ul>
			</div>
		)
	};

	return (
		<Layout title='Admin Dashboard' description={`Howdy, \u00A0 ${name}`}>
			<div className="row container-fluid">
				<div className="col-lg-3 col-md-4 col-sm-12">
					{adminLinks()}
				</div>

				<div className="col-lg-9 col-md-8 col-sm-12">
					{adminInfo()}
				</div>
			</div>
		</Layout>
	)
};

export default AdminDashboard;
