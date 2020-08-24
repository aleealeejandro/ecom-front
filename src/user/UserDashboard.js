import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getPurchaseHistory} from './apiUser';
import moment from 'moment'

const Dashboard = () => {
	const [history, setHistory] = useState([])
	
	const {
		user: {_id, name, email, role}
	} = isAuthenticated();

	const token = isAuthenticated().token

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setHistory(data)
			}
		})
	}

	useEffect(() => {
		init(_id, token)
	})

	const userLinks = () => {
		return (
			<div className="card">
				<h4 className="card-header">User Links</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className='nav-link' to='/cart'>My Cart</Link>
					</li>

					<li className="list-group-item">
						<Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
					</li>
				</ul>
			</div>
		)
	};

	const userInfo = () => {
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

	const purchaseHistory = history => {
	  return (
	    <div className="card mb-5">
	      <h3 className="card-header">Purchase history</h3>
	      <ul className="list-group">
	        <li className="list-group-item">
	          {history.map((h, i) => {
	            return (
	              <div key={i} className='row' style={{borderBottom: '1px black solid'}}>
	              	<h5 className='text-left ml-2'>
                    Purchased date:{" "}
                    {moment(h.createdAt).fromNow()}
                  </h5>
	                <hr />
	                {h.products.map((product) => {
	                  return (
	                    <div key={product._id} className='col-12 text-left'>
	                      <h6>Product name: {product.name}</h6>
	                      <h6>Product price: ${product.price}</h6>
	                      
	                      <hr />
	                    </div>
	                  );
	                })}
	              </div>
	            );
		        })}
	        </li>
	      </ul>
	    </div>
	  );
	};

	return (
		<Layout title='Dashboard' description={`Howdy, \u00A0 ${name}`} >
			<div className="row container-fluid">
				<div className="col-lg-3 col-md-12 mx-auto">
					{userLinks()}
				</div>

				<div className="col-lg-9 col-md-12 mx-auto">
					{userInfo()}
					{purchaseHistory(history)}
				</div>
			</div>
		</Layout>
	)
};

export default Dashboard;
