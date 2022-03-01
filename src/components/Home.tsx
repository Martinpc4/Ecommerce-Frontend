// ! Imports
// * React Hooks
import { useEffect, useState } from 'react';
// * React Components
import Item from './Item';
// * Controllers
import ProductsController from '../controllers/product.controller';
// * DTOs
import { ProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { Types } from 'mongoose';

// ! Component Definition
function Home(): JSX.Element {
	const [products, setProducts] = useState<ProductDTO[]>([]);
	useEffect(() => {
		(async () => {
			const products: ProductDTO[] = await ProductsController.getAllProducts();
			setProducts(products);
		})();
	}, []);

	function formatProduct(product: ProductDTO): JSX.Element {
		return (
			<Item
				_id={product._id}
				name={product.name}
				memory={product.memory}
				price={product.price}
				imagesURL={product.imagesURL}
				categoryId={product.categoryId}
			/>
		);
	}

	function getProduct(productId: Types.ObjectId): JSX.Element {
		if (products.length > 0) {
			let productFound: JSX.Element = <div>Product not found</div>;
			products.forEach((product: ProductDTO) => {
				if (productId.equals(product._id)) {
					productFound = formatProduct(product);
				}
			});
			return productFound;
		}
		return <></>;
	}

	return (
		<div className='container py-5'>
			<div className='row'>
				<div className='col-12'>
					<p className='m-0 text-center fs-2'>Latest Products</p>
				</div>
			</div>
			<div className='row align-items-center gy-5 gx-5'>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>MacBook Air</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col'>
							<div className='row align-content-center justify-content-start'>
								<img
									className='w-100'
									src='https://www.apple.com/v/macbook-air/k/images/overview/machine_learning__d8u6dxf5xawm_large_2x.png'
									alt=''
								/>
							</div>
						</div>
						<div className='col-5'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>MacBook Pro</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col-5'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
						<div className='col'>
							<div className='row align-content-center justify-content-end'>
								<img
									className='w-100'
									src='https://www.apple.com/v/macbook-pro-13/h/images/overview/macos__3zitq287xeae_large_2x.png'
									alt=''
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>iPhone 12 Pro</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col'>
							<img
								className='w-100'
								src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-pro-magsafe-202104?wid=1380&hei=904&fmt=jpeg&qlt=80&.v=1617147706000'
								alt=''
							/>
						</div>
						<div className='col-4'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>iPhone 12</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col-4'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
						<div className='col'>
							<img
								className='w-100'
								src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-magsafe-202104?wid=1680&hei=800&fmt=jpeg&qlt=80&.v=1617147705000'
								alt=''
							/>
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>iPad Pro</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col'>
							<img
								className='w-100'
								src='https://www.apple.com/v/ipad-pro/af/images/shared/ipad_trade_in__ggq1dqvyb56y_large_2x.png'
								alt=''
							/>
						</div>
						<div className='col-5'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row my-4'>
						<div className='col'>
							<p className='m-0 fs-4 text-center'>iPad Air</p>
						</div>
					</div>
					<div className='row align-items-center gx-5'>
						<div className='col-5'>{getProduct(new Types.ObjectId('6210356c15c06dee8f44a3b7'))}</div>
						<div className='col'>
							<img
								className='w-100'
								src='https://www.apple.com/v/ipad/shared/why-ipad/h/images/why-ipad/markup/shapes__x3ypvrhjmlei_large_2x.jpg'
								alt=''
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// ! Exports
export default Home;
