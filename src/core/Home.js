import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => { 
	const [productsBySell, setProductsBySell] = useState([])
	const [productsByArrival, setProductsByArrival] = useState([])
	const [error, setError] = useState(false)

	const loadProductsBySell = () => {
		getProducts('sold').then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setProductsBySell(data)
			}
		})
	}

	const loadProductsByArrival = () => {
		getProducts('createdAt').then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setProductsByArrival(data)
			}
		})
	}

	useEffect(() => {
		loadProductsByArrival()
		loadProductsBySell()
	}, [])

	return (
		<Layout title='Home Page' description='Node React E-commerce App'>
			<div className="container">
				<Search />
				<h2 className="mt-4 mb-5">Best Sellers</h2>
				<div className="row mb-4">
					{productsBySell.map((product) => (
						<div key={product._id} className='col-lg-4 col-md-6 col-sm-12'>
							<Card product={product} />
						</div>
					))}
					<hr />
				</div>
				
				<h2 className="mt-5 mb-4">New Arrivals</h2>
				<div className="row mb-4">
					{productsByArrival.map((product) => (
						<div key={product._id} className='col-lg-4 col-md-6 col-sm-12'>
							<Card product={product} />
						</div>
					))}
					<hr />
				</div>
			</div>
		</Layout>
	);

}
export default Home;
