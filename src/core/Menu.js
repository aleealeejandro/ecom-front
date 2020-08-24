import React, {Fragment, Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'

const isActive = (history, path) => {
	if(history.location.pathname === path) {
		return {color: '#ff9900'}
	} else {
		return {color: '#ffffff'}
	}
};

const Menu = ({history}) => (
	<div>
		<ul className='nav nav-tabs bg-primary'>
			<li className='nav-item'>
				<Link 
					className='nav-link' 
					style={isActive(history, '/')} 
					to='/'
				>
					Home
				</Link>
			</li>

			<li className='nav-item'>
				<Link 
					className='nav-link' 
					style={isActive(history, '/shop')} 
					to='/shop'
				>
					Shop
				</Link>
			</li>

			{isAuthenticated() && isAuthenticated().user.role === 0 && (
				<li className='nav-item'>
					<Link 
						className='nav-link' 
						style={isActive(history, '/user/dashboard')} 
						to='/user/dashboard'
					>
						Dashboard
					</Link>
				</li>
			)}

			{isAuthenticated() && isAuthenticated().user.role === 1 && (
				<li className='nav-item'>
					<Link 
						className='nav-link' 
						style={isActive(history, '/admin/dashboard')} 
						to='/admin/dashboard'
					>
						Dashboard
					</Link>
				</li>
			)}

			{!isAuthenticated() && (
				<Fragment>
					<li className='nav-item'>
						<Link 
							className='nav-link' 
							style={isActive(history, '/signin')} 
							to='/signin'
						>
							Sign in
						</Link>
					</li>

					<li className='nav-item'>
						<Link 
							className='nav-link' 
							style={isActive(history, '/signup')} 
							to='/signup'
						>
							Sign up
						</Link>
					</li>
				</Fragment>
			)}

			{isAuthenticated() && (
				<li className='nav-item'>
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
				</li>
			)}

			<li className='nav-item ml-auto'>
				<Link 
					className='nav-link' 
					style={isActive(history, '/cart')} 
					to='/cart'
				>
					<i className="fas fa-shopping-cart">
						<sup><span className="badge ml-1">{itemTotal()}</span></sup>
					</i>
				</Link>
			</li>
		</ul>
	</div>
);

export default withRouter(Menu);


// import React, {Fragment, useState} from 'react'
// import {withRouter} from 'react-router-dom'
// // import { BrowserRouter as Router } from 'react-router-dom';
// // import {Link, withRouter} from 'react-router-dom'
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
// import {signout, isAuthenticated} from '../auth'

// const isActive = (history, path) => {
// 	if(history.location.pathname === path) {
// 		return {color: '#ff9900'}
// 	} else {
// 		return {color: '#000000'}
// 	}
// };

// const Menu = ({history}) => {



//   const [collapsed, setCollapsed] = useState(true);

//   const toggleCollapse = () => setCollapsed(!collapsed);

// 	  return (
// 		  <MDBNavbar color="indigo" dark expand="md" style={{backgroundColor: '#000000'}}>
// 		    <MDBNavbarToggler onClick={toggleCollapse} />
// 		    <MDBCollapse id="navbarCollapse3" isOpen={!collapsed} navbar>
// 		      <MDBNavbarNav left>

// 		        <MDBNavItem active>
// 		          <MDBNavLink to='/' style={isActive(history, '/')} >
// 		            Home
// 		          </MDBNavLink>
// 		        </MDBNavItem>

// 						{isAuthenticated() && isAuthenticated().user.role === 0 && (
// 							<MDBNavItem>
// 		            <MDBNavLink to='/user/dashboard' style={isActive(history, '/user/dashboard')} >Dashboard</MDBNavLink>
// 		          </MDBNavItem>
// 						)}

// 						{isAuthenticated() && isAuthenticated().user.role === 1 && (
// 							<MDBNavItem>
// 		            <MDBNavLink to='/admin/dashboard' style={isActive(history, '/admin/dashboard')}  >Dashboard</MDBNavLink>
// 		          </MDBNavItem>
// 						)}

// 						{!isAuthenticated() && (
// 							<Fragment>
// 								<MDBNavItem>
// 		              <MDBNavLink to='/signin' style={isActive(history, '/signin')}   >Sign in</MDBNavLink>
// 		            </MDBNavItem>
										
// 								<MDBNavItem>
// 		              <MDBNavLink to='/signup' style={isActive(history, '/signup')}   >Sign in</MDBNavLink>
// 		            </MDBNavItem>
// 							</Fragment>
// 						)}

// 						{isAuthenticated() && (
// 							<MDBNavItem>
// 		            <MDBNavLink 
// 		              style={{cursor: 'pointer', color: '#000000'}}
// 									onClick={() => 
// 									 	signout(() => {
// 											history.push('/');
// 										})
// 									}
// 								>
// 		              Sign Out
// 		            </MDBNavLink>
// 		          </MDBNavItem>
// 						)}
// 		      </MDBNavbarNav>

// 		      <MDBNavbarNav right>
// 		        <MDBNavItem>
// 		          <MDBDropdown>
// 		            <MDBDropdownToggle nav caret>
// 		              <MDBIcon icon="user" />
// 		            </MDBDropdownToggle>
// 		            <MDBDropdownMenu className="dropdown-default">
// 		              <MDBDropdownItem href="#!">Action</MDBDropdownItem>
// 		              <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
// 		              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
// 		              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
// 		            </MDBDropdownMenu>
// 		          </MDBDropdown>
// 		        </MDBNavItem>
// 		      </MDBNavbarNav>
// 		    </MDBCollapse>
// 		  </MDBNavbar>
// 	  )
// }

// export default withRouter(Menu);
