// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import AuthContext from './contexts/Auth';
import CartContext from './contexts/Cart';
// * React Components
import ItemCounter from './ItemCounter';
// * Controllers
import ProductsController from '../controllers/product.controller';
import CartController from '../controllers/cart.controller';
// * DTOs
import { CartProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { AuthContextInterface, CartContextInterface, ItemCartProps } from '../interfaces/components.interface';

// ! Component Definition
function ItemCart({ productProperties, listModel }: ItemCartProps): JSX.Element {
	const [productAmount, setProductAmount] = useState<number>(productProperties.amount);
	const [stockState, setStockState] = useState(true);

	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { setCartRefresh } = useContext<CartContextInterface>(CartContext);

	useEffect(() => {
		(async function () {
			if (
				!(await ProductsController.validateStock(productProperties._id, productAmount, productProperties.color))
			) {
				setStockState(false);
			} else {
				setStockState(true);
			}
		})();
	}, [productAmount]);

	async function applyAmountChangesToCart(): Promise<void> {
		if (Token !== null) {
			if (productAmount === 0) {
				await CartController.deleteProductFromCart(Token, productProperties);
				setCartRefresh(true);
			} else {
				const product: CartProductDTO | null = await CartController.getProduct(
					Token,
					productProperties._id,
					productProperties.color
				);
				if (product !== null) {
					await CartController.modifyProduct(Token, {
						...productProperties,
						amount: productAmount,
					});
					setCartRefresh(true);
				} else {
					throw new Error('Product not found in cart');
				}
			}
		}
	}

	let fontSizeM2: { fontSize: number } = { fontSize: 13 };

	if (listModel === 1) {
		// for the CartWidget Component
		return (
			<div key={`${productProperties._id}-${productProperties.color}-1`} className='row align-items-center'>
				<div className='col-2 px-2'>
					<img className='h-100 w-100' src={String(productProperties.imagesURL[0])} alt='' />
				</div>
				<div className='col-6 px-2'>
					<div className='row'>
						<p className='m-0 w-auto' style={fontSizeM2}>
							{productProperties.name} - x{productProperties.amount}
						</p>
					</div>
				</div>
				<div className='col-4 px-2'>
					<div className='row'>
						<p className='m-0 text-end' style={fontSizeM2}>
							{String(productProperties.price * productProperties.amount)} USD
						</p>
					</div>
				</div>
			</div>
		);
	} else if (listModel === 2) {
		// for the Cart Component
		return (
			<div className='col-12'>
				<div className='row align-items-center gx-1 border-bottom border-top px-3'>
					<div className='col-2'>
						<img className='w-50' src={String(productProperties.imagesURL[0])} alt='' />
					</div>
					<div className='col-5'>
						<div className='row'>
							<p className='m-0 fs-6'>
								{productProperties.name} ({productProperties.color}) -{' '}
								{productProperties.memory !== null ? `${productProperties.memory}Gb ` : null}
							</p>
						</div>
					</div>
					<div className='col-2'>
						<div className='row'>
							<p className='price m-0 fs-6'>
								{String(productProperties.price * productAmount)}
								,00 USD
							</p>
						</div>
					</div>
					<div className='col-3'>
						<div className='container'>
							<div className='row align-items-center'>
								{!stockState && (
									<div className='col m-0 p-0 d-flex flex-row justify-content-end'>
										<i
											className='fs-5 me-2 text-danger bi bi-exclamation-diamond'
											data-bs-toggle='tooltip'
											title='Not enough stock'
										/>
									</div>
								)}
								<div className='col d-flex flex-row justify-content-end'>
									<ItemCounter
										itemAmount={productAmount}
										itemAmountFunction={setProductAmount}
										stockState={stockState}
										applyChangesFunction={applyAmountChangesToCart}
										cartItemAmount={productProperties.amount}
										isApplyChanges={true}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <h1>List model is not valid1</h1>;
	}
}

// ! Exports
export default ItemCart;
