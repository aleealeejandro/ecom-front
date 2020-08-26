import React, {Fragment, Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'

const isActive = (history, path) => {
	// if(history.location.pathname === path) {
	// 	return {color: '#ff9900'}
	// } else {
	// 	return {color: '#ffffff'}
	// }
	return history.location.pathname === path ? {color: '#ff9900'} : {color: '#ffffff'}
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


// import React, {Fragment, Component, useState, useEffect} from 'react'
// import {Link, withRouter} from 'react-router-dom'
// import {signout, isAuthenticated} from '../auth'
// import {itemTotal} from './cartHelpers'


// const isActive = (history, path) => {
// 		const pathname = history.location.pathname
// 		return pathname === path ? {color: '#000000'} : {color: '#ffffff'}
// 	};


// const Menu = ({history}) => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

// 	// const [collapsed, setCollapsed] = useState(true);
// 	// const toggleCollapse = () => setCollapsed(!collapsed);


// 	return (
// 		<div>
// 			<nav className="navbar navbar-expand-md bg-custom flex-column align-items-stretch fixed-top nav-tabs">
// 				<div className="d-flex">
// 					<Link className="navbar-brand mx-auto" to="/">
// 						ECOMMERCE
// 					</Link>

// 					<button 
// 						class="navbar-toggler ml-auto custom-toggler" 
// 						type="button" 
// 						data-toggle="collapse" 
// 						data-target="#navbarNavAltMarkup" 
// 						aria-controls="navbarNavAltMarkup" 
// 						aria-expanded={!isNavCollapsed ? true : false} 
// 						aria-label="Toggle navigation"
// 						onClick={handleNavCollapse}
// 					>
// 						<span className="navbar-toggler-icon"></span>
// 					</button>
// 				</div>

// 				<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse collapse w-100`} id="navbarNavAltMarkup">
// 					<ul className="navbar-nav mx-auto">
// 						<li className='nav-item'>
// 							<Link 
// 								className='nav-link' 
// 								style={isActive(history, '/')} 
// 								to='/'
// 							>
// 								Home
// 							</Link>
// 						</li>

// 						<li className='nav-item'>
// 							<Link 
// 								className='nav-link' 
// 								style={isActive(history, '/shop')} 
// 								to='/shop'
// 							>
// 								Shop
// 							</Link>
// 						</li>

// 						{isAuthenticated() && isAuthenticated().user.role === 0 && (
// 							<li className='nav-item'>
// 								<Link 
// 									className='nav-link' 
// 									style={isActive(history, '/user/dashboard')} 
// 									to='/user/dashboard'
// 								>
// 									Dashboard
// 								</Link>
// 							</li>
// 						)}

// 						{isAuthenticated() && isAuthenticated().user.role === 1 && (
// 							<li className='nav-item'>
// 								<Link 
// 									className='nav-link' 
// 									style={isActive(history, '/admin/dashboard')} 
// 									to='/admin/dashboard'
// 								>
// 									Dashboard
// 								</Link>
// 							</li>
// 						)}

// 						{!isAuthenticated() && (
// 							<Fragment>
// 								<li className='nav-item'>
// 									<Link 
// 										className='nav-link' 
// 										style={isActive(history, '/signin')} 
// 										to='/signin'
// 									>
// 										Sign in
// 									</Link>
// 								</li>

// 								<li className='nav-item'>
// 									<Link 
// 										className='nav-link' 
// 										style={isActive(history, '/signup')} 
// 										to='/signup'
// 									>
// 										Sign up
// 									</Link>
// 								</li>
// 							</Fragment>
// 						)}

// 						{isAuthenticated() && (
// 							<li className='nav-item'>
// 								<span 
// 									className='nav-link' 
// 									style={{cursor: 'pointer', color: '#ffffff'}}
// 									onClick={() => 
// 									 	signout(() => {
// 											history.push('/');
// 										})
// 									}
// 								>
// 									Sign Out
// 								</span>
// 							</li>
// 						)}

// 						<li className='nav-item ml-auto'>
// 							<Link 
// 								className='nav-link' 
// 								style={isActive(history, '/cart')} 
// 								to='/cart'
// 							>
// 								<i className="fas fa-shopping-cart">
// 									<sup><span className="badge ml-1">{itemTotal()}</span></sup>
// 								</i>
// 							</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</nav>
// 		</div>
// 	)
// }

// export default withRouter(Menu);
