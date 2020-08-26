import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read, listRelated} from './apiCore'
import Card from './Card'

const Product = props => {
	const [product, setProduct] = useState({})
	const [relatedProduct, setRelatedProduct] = useState([])
	const [error, setError] = useState(false)

	const loadSingleProduct = productId => {
		read(productId).then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setProduct(data)
				//fetch related products
				listRelated(data._id).then(data => {
					if(data.error) {
						setError(data.error)
					} else {
						setRelatedProduct(data)
					}
				})
			}
		})
	}

	useEffect(() => {
		const productId = props.match.params.productId;
		loadSingleProduct(productId);
	}, [props])

	return (
		<Layout 
			title={product && product.name} 
			description={
				product && 
				product.description && 
				product.description.substring(0, 100)
			}
		>
			<div className="row mb-4 container-fluid mx-auto">
				<div className="col-12 ">
					{product && product.description && (
						<Card product={product} showViewProductButton={false} />
					)}
				</div>

				<div className="col-12">
					<h4 className='mt-5 text-center'>Related Products</h4>
					<div className="row">
					  {relatedProduct.map((p) => (
							<div className="mb-3 col-lg-4 col-md-6 col-sm-12" key={p._id}>
								<Card product={p}/>
							</div>
					 	))}
					</div>
				</div>
			</div>
		</Layout>
	);
} 

export default Product;
