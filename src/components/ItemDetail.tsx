// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
import CartContext from './contexts/Cart';
// * React Components
import Select from 'react-select';
import ItemCounter from './ItemCounter';
// * Controllers
import CartController from '../controllers/cart.controller';
import ProductsController from '../controllers/product.controller';
// * DTOs
import { CartProductDTO, DisplayProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { AuthContextInterface, CartContextInterface } from '../interfaces/components.interface';
import { productColorsInterface, productPropertiesInterface } from '../interfaces/product.interface';
// * Views & Partials
import { Types } from 'mongoose';

// ! Component Definition
let colorOptions: productColorsInterface[] = [];
function ItemDetail(): JSX.Element {
	const { CategoryId, ItemId } = useParams();

	let { Token } = useContext<AuthContextInterface>(AuthContext);
	let { CartId, setCartRefresh } = useContext<CartContextInterface>(CartContext);

	const navigate = useNavigate();

	const [product, setProduct] = useState<DisplayProductDTO | null>(null);
	const [productColor, setProductColor] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);

	function generateCarouselImages(imagesURL: string[]): JSX.Element[] {
		let imagesJSXArray: JSX.Element[] = [];
		let imagesCounter: number = 0;
		imagesURL.forEach((imageURL: string) => {
			imagesCounter++;
			imagesJSXArray.push(
				<div
					key={`${imagesCounter}-${imageURL}`}
					className={
						imageURL === imagesURL[0] ? 'carousel-item active h-100 px-5' : 'carousel-item h-100 px-5'
					}
					data-bs-interval='10000'
				>
					<img src={String(imageURL)} className='d-block h-100 w-100' alt='...' />
				</div>
			);
		});
		return imagesJSXArray;
	}

	function generateCarouselIndicators(imagesURL: string[]): JSX.Element[] {
		let buttons: JSX.Element[] = [];
		for (let i = 0; i < imagesURL.length; i++) {
			buttons.push(
				<button
					key={`${imagesURL}-button-${i}`}
					type='button'
					data-bs-target='#productCarousel'
					data-bs-slide-to={i}
					className='active'
					aria-current='true'
					aria-label={`Silde ${i + 1}`}
				/>
			);
		}
		return buttons;
	}

	function formatProduct(productProperties: productPropertiesInterface): DisplayProductDTO {
		// Set Color Options w/ react-select
		let colorCounter: number = 0;
		colorOptions = [];
		productProperties.colors.forEach((color: string) => {
			let stockFlag: boolean = false; // stock control
			if (product !== undefined && productProperties.stock[colorCounter] === 0) {
				stockFlag = true;
			}
			colorOptions.push({
				value: String(color),
				label: String(color),
				isDisabled: stockFlag,
			});
			colorCounter++;
		});

		let imagesBootstrapComponents: JSX.Element[] = generateCarouselImages(productProperties.imagesURL);

		let carouselIndicators: JSX.Element[] = generateCarouselIndicators(productProperties.imagesURL);

		return new DisplayProductDTO({ ...productProperties, imagesBootstrapComponents, carouselIndicators });
	}

	async function handleAddToCart() {
		if (Token !== null) {
			if (product !== null) {
				const cartProductInstance: CartProductDTO = new CartProductDTO({
					...product,
					amount,
					color: productColor,
				});
				await CartController.addProductToCart(Token, CartId, cartProductInstance);
				setCartRefresh(true);
				navigate('/Cart');
			}
		} else {
			navigate('/Login');
		}
	}

	useEffect(() => {
		(async () => {
			setProduct(formatProduct(await ProductsController.getProductById(new Types.ObjectId(ItemId))));
		})();
	}, [ItemId, CategoryId]);

	if (product !== null) {
		return (
			<div className='mb-5 container d-flex flex-column align-items-between'>
				<div className='row gx-5 mb-4 justify-content-center align-items-center h-75'>
					<div className='col-5 h-100'>
						<div className='row h-100'>
							<div
								id='productCarousel'
								className='carousel carousel-dark slide h-100'
								data-bs-ride='carousel'
							>
								<div className='carousel-inner h-100'>{product.imagesBootstrapComponents}</div>
								<div className='carousel-indicators'>{product.carouselIndicators}</div>
								<button
									className='carousel-control-prev'
									type='button'
									data-bs-target='#productCarousel'
									data-bs-slide='prev'
								>
									<span className='carousel-control-prev-icon' aria-hidden='true' />
									<span className='visually-hidden'>Previous</span>
								</button>
								<button
									className='carousel-control-next'
									type='button'
									data-bs-target='#productCarousel'
									data-bs-slide='next'
								>
									<span className='carousel-control-next-icon' aria-hidden='true' />
									<span className='visually-hidden'>Next</span>
								</button>
							</div>
						</div>
					</div>
					<div className='col-5 h-100 pt-5'>
						<div className='row gy-5'>
							<div className='col-12'>
								<div className='row'>
									<p className='m-0 mb-3 fs-4'>{product.name}</p>
								</div>
								<div className='row'>
									<p className='m-0 mb-2 fs-6'>
										{product.memory !== null
											? `${product.name} - ${product.memory}Gb `
											: `${product.name}`}
										{productColor !== '' && `- ${productColor}`}
									</p>
								</div>
								<div className='row'>
									<div className='col-12'>
										<Select
											className='m-0 mb-2 w-50 fs-6'
											options={colorOptions}
											onChange={(e: any) => {
												setProductColor(String(e.value));
											}}
										/>
									</div>
								</div>
							</div>
							<div className='col-12'>
								<div className='row'>
									<p className='m-0 fs-5 price'>{product.price} $ USD</p>
								</div>
								<div className='row'>
									<div className='col-12'>
										<p className='m-0 fs-6'>Amount</p>
									</div>
									<div className='col-12'>
										<ItemCounter itemAmount={amount} itemAmountFunction={setAmount} />
									</div>
								</div>
								<div className='row mt-3'>
									<div className='col-12'>
										{amount >= 1 ? (
											<button
												type='button'
												onClick={handleAddToCart}
												className={`btn btn-secondary fs-6 ${
													productColor !== '' ? null : 'disabled'
												}`}
											>
												Add to cart
											</button>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 px-5'>
						<p className='text-justify lead fs-6 px-5'>{product.description}</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='container d-flex justify-content-center p-5'>
				<div className='row'>
					<div className='col'>
						<h5>Product not Found</h5>
					</div>
				</div>
			</div>
		);
	}
}

// ! Exports
export default ItemDetail;
