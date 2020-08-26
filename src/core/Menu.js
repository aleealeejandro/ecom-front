import React, {Fragment, Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
import {Navbar, Nav} from 'react-bootstrap'

const isActive = (history, path) => {
	const pathname = history.location.pathname;
	return pathname === path ? {color: '#ff9900'} : {color: '#ffffff'}
};

const Menu = ({history}) => (

	<div>
		<Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
			<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
		  <Navbar.Brand 
		  	href="/"
		  	className='mx-auto'
		  >
		  	ECOMMERCE
		  </Navbar.Brand>

		  <Nav.Link 
				className='nav-link ml-auto' 
				style={isActive(history, '/cart')} 
				href='/cart'
			>
				<i className="fas fa-shopping-cart">
					<sup><span className="badge ml-1">{itemTotal()}</span></sup>
				</i>
			</Nav.Link>
		  
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="mx-auto">
		      <Nav.Link 
		      	href="/"
		      	className='nav-link' 
						style={isActive(history, '/')} 
		      >
			      HOME
			    </Nav.Link>

			    <Nav.Link 
		      	href="/shop"
		      	className='nav-link' 
						style={isActive(history, '/shop')} 
		      >
			      SHOP
			    </Nav.Link>

					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<Nav.Link 
							className='nav-link' 
							style={isActive(history, '/user/dashboard')} 
							href='/user/dashboard'
						>
							Dashboard
						</Nav.Link>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
							<Nav.Link 
								className='nav-link' 
								style={isActive(history, '/admin/dashboard')} 
								href='/admin/dashboard'
							>
								Dashboard
							</Nav.Link>
					)}


					{!isAuthenticated() && (
						<Fragment>
							<Nav.Link 
								className='nav-link' 
								style={isActive(history, '/signin')} 
								href='/signin'
							>
								Sign in
							</Nav.Link>

							<Nav.Link 
								className='nav-link' 
								style={isActive(history, '/signup')} 
								href='/signup'
							>
								Sign up
							</Nav.Link>
						</Fragment>
					)}

					{isAuthenticated() && (
						<span 
							className='nav-link' 
							style={{cursor: 'pointer', color: '#ffffff'}}
							onClick={() => 
							 	signout(() => {
									history.push('/');
								})
							}
						>
							Sign Out
						</span>
					)}

		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
	</div>

);
export default withRouter(Menu);



// {
// 		<div>
// 		<ul className='nav nav-tabs bg-primary'>
// 			<li className='nav-item'>
// 				<Link 
// 					className='nav-link' 
// 					style={isActive(history, '/')} 
// 					to='/'
// 				>
// 					Home
// 				</Link>
// 			</li>

// 			<li className='nav-item'>
// 				<Link 
// 					className='nav-link' 
// 					style={isActive(history, '/shop')} 
// 					to='/shop'
// 				>
// 					Shop
// 				</Link>
// 			</li>

			// {isAuthenticated() && isAuthenticated().user.role === 0 && (
			// 	<li className='nav-item'>
			// 		<Link 
			// 			className='nav-link' 
			// 			style={isActive(history, '/user/dashboard')} 
			// 			to='/user/dashboard'
			// 		>
			// 			Dashboard
			// 		</Link>
			// 	</li>
			// )}

			// {isAuthenticated() && isAuthenticated().user.role === 1 && (
			// 	<li className='nav-item'>
			// 		<Link 
			// 			className='nav-link' 
			// 			style={isActive(history, '/admin/dashboard')} 
			// 			to='/admin/dashboard'
			// 		>
			// 			Dashboard
			// 		</Link>
			// 	</li>
			// )}

			// {!isAuthenticated() && (
			// 	<Fragment>
			// 		<li className='nav-item'>
			// 			<Link 
			// 				className='nav-link' 
			// 				style={isActive(history, '/signin')} 
			// 				to='/signin'
			// 			>
			// 				Sign in
			// 			</Link>
			// 		</li>

			// 		<li className='nav-item'>
			// 			<Link 
			// 				className='nav-link' 
			// 				style={isActive(history, '/signup')} 
			// 				to='/signup'
			// 			>
			// 				Sign up
			// 			</Link>
			// 		</li>
			// 	</Fragment>
			// )}

			// {isAuthenticated() && (
			// 	<li className='nav-item'>
			// 		<span 
			// 			className='nav-link' 
			// 			style={{cursor: 'pointer', color: '#ffffff'}}
			// 			onClick={() => 
			// 			 	signout(() => {
			// 					history.push('/');
			// 				})
			// 			}
			// 		>
			// 			Sign Out
			// 		</span>
			// 	</li>
			// )}

			// <li className='nav-item ml-auto'>
			// 	<Link 
			// 		className='nav-link' 
			// 		style={isActive(history, '/cart')} 
			// 		to='/cart'
			// 	>
			// 		<i className="fas fa-shopping-cart">
			// 			<sup><span className="badge ml-1">{itemTotal()}</span></sup>
			// 		</i>
			// 	</Link>
			// </li>
// 		</ul>
// 	</div>
// }

