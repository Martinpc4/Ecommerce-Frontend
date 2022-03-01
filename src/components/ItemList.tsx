// ! Imports
// * React Hooks
import { useEffect, useState } from 'react';
// * React Components
import Item from './Item';
// * Interfaces
import { productPropertiesInterface } from '../interfaces/product.interface';
import { ItemListProps } from '../interfaces/components.interface';
import { Types } from 'mongoose';

// ! Component Definition
function ItemList({ categoryId }: ItemListProps): JSX.Element {
	const [products, setProducts] = useState<JSX.Element[]>([]);

	async function serverRequest(): Promise<void> {
		const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/category/${categoryId}`, {
			method: 'GET',
		});

		if (request.status !== 200) {
			throw new Error('Cannot get all products from server');
		}

		const productData: productPropertiesInterface[] = await request.json();

		const products: JSX.Element[] = [];
		productData.forEach((product: productPropertiesInterface) => {
			products.push(
				<div key={`${product._id}`} className='col-xs-6 col-sm-5 col-lg-3 m-sm-3 m-md-3 border'>
					<Item
						_id={new Types.ObjectId(product._id)}
						name={product.name}
						memory={product.memory}
						price={product.price}
						imagesURL={product.imagesURL}
						categoryId={product.categoryId}
					/>
				</div>
			);
		});

		setProducts(products);
	}

	useEffect(() => {
		(async () => {
			await serverRequest();
		})();
	}, [categoryId]);

	return (
		<div className='container px-5 px-sm-0'>
			<div className='row align-items-center justify-content-center px-5 px-sm-0 gy-5 gy-sm-0'>{products}</div>
		</div>
	);
}

// ! Exports
export default ItemList;
