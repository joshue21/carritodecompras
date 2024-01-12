import { data } from '../data';
import { useState } from 'react';

export const ProductCard = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = (product) => {
		console.log(product)
		product.quantity = 1;

		if (allProducts.find(item => item.data.productId === product.data.productId)) {
			const products = allProducts.map(item => 
				item.data.productId === product.data.productId
					? { ...item, quantity: item.quantity + 1 }
					: item
			
				
			);
			
			setTotal(total + product.data.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		
		setTotal(total + product.data.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div className='container-items'>
			{data.map(product => (
				<div className='item' key={product.data.productId}>
					<figure>
						<img src={product.data.image} alt={product.data.title} />
					</figure>
					<div className='info-product'>
						<h2>{product.data.title}</h2>
						<p>{product.data.description}</p>
						<p className='price'>${product.data.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
