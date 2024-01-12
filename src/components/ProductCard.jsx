import { data } from '../data';
import { useState } from 'react';
const BASE_URL = "https://chupaprecios.com.mx/rest/V1";

export const ProductCard = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const [asin, setAsin] = useState('B07ZQS94VJ');
	const [selectedStore, setSelectedStore] = useState('amazon');
	const [apiProducts, setApiProducts] = useState([]);

	const getToken = async () => {
		const response = await fetch(`${BASE_URL}/integration/admin/token`, {
		  method: 'POST', 
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({username: 'candidatoFront', password: 'Ch8t45t!f' })
		});
		const data = await response.json();
		getProducts(data);
	};

	const getProducts = async (token) => {
		const response = await fetch(`${BASE_URL}/chupaprecios/productdetail/?asin=${asin}&selectedStore=${selectedStore}`, {
		  method: "GET",
		  headers: {
			'Content-Type': 'application/json',
			"Authorization" : 'Bearer ' + token
		  }
		});
		const data = await response.json();
		setApiProducts(data);
	};

	//useEffect(() => {
		getToken();
	//}, []);

	const onAddProduct = (product) => {
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
			{apiProducts.map(product => (
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
