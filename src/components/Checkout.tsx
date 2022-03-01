// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
import CartContext from './contexts/Cart';
import UserContext from './contexts/User';
// * Controllers
import CartController from '../controllers/cart.controller';
// * DTOs
import { CartProductDTO } from '../DTOs/product.dto';
// * Interfaces
import {
	AuthContextInterface,
	CartContextInterface,
	CheckoutErrorInterface,
	PurchaseStateInterface,
	UserContextInterface,
} from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function Checkout(): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { CartId, cartProducts, cartTotal } = useContext<CartContextInterface>(CartContext);
	const { setUserRefresh } = useContext<UserContextInterface>(UserContext);

	const navigate: NavigateFunction = useNavigate();

	const [purchaseState, setPurchaseState] = useState<PurchaseStateInterface>({
		state: false,
		receiptId: undefined,
	});

	const [error, setError] = useState<CheckoutErrorInterface>({ state: false, stack: null });

	useEffect(() => {
		if (Token === null) {
			navigate('/login');
		}
	}, [CartId, Token]);

	function formatProducts() {
		if (CartId !== null) {
			let JSXProducts: JSX.Element[] = [];
			cartProducts.forEach((product: CartProductDTO) => {
				JSXProducts.push(
					<div className='row gy-5' key={`${product._id}${product.color}`}>
						<div className='col-auto'>
							<p
								className='m-0 align-items-center d-flex'
								style={{
									fontSize: '1rem',
								}}
							>
								{product.name}
								<span
									className='ms-2'
									style={{
										fontSize: '.6rem',
									}}
								>
									({product.color})
								</span>
								<span
									className='ms-2'
									style={{
										fontSize: '.8rem',
									}}
								>
									{product.memory}Gb
								</span>
								<span
									className='ms-2'
									style={{
										fontSize: '.8rem',
									}}
								>
									x {product.amount}u
								</span>
							</p>
						</div>
						<div className='col d-flex flex-column justify-content-center'>
							<div className='row border-bottom w-100' />
						</div>
						<div className='col-auto'>
							<p
								className='m-0'
								style={{
									fontSize: '1rem',
								}}
							>
								${product.price * product.amount} USD
							</p>
						</div>
					</div>
				);
			});
			return JSXProducts;
		}
	}

	async function handlePurchase(): Promise<void> {
		try {
			if (Token !== null && CartId !== null) {
				const res: Response = await CartController.checkoutCart(Token);

				if (res.status === 200) {
					const receiptId = (await res.json()).receiptInstance._id;
					setUserRefresh(true);
					setPurchaseState({ state: true, receiptId });
				} else if (res.status === 404) {
					setPurchaseState({ state: false, receiptId: undefined });
					setError({ state: true, stack: "Cart does not exist, is empty or User's email is not verified" });
				} else {
					setError({
						state: true,
						stack: 'There was an error processing the purchase, please try again later',
					});
					setPurchaseState({ state: false, receiptId: undefined });
				}
			} else if (CartId === null) {
				navigate('/');
			} else {
				navigate('/Login');
			}
		} catch (e: any) {
			throw new Error(e);
		}
	}

	return (
		<div className='container'>
			{purchaseState.state && purchaseState.receiptId !== undefined ? (
				<div className='row'>
					<div className='col-12'>
						<div className='alert alert-success' role='alert'>
							<div className='row'>
								<p className='m-0 fs-6'>Purchase details have already been sent to your email!</p>
							</div>
							<div className='row'>
								<p className='m-0 fs-6'>Receipt Id: {purchaseState.receiptId}</p>
							</div>
						</div>
					</div>
				</div>
			) : null}
			<div className='row gx-5'>
				<div className='col-6'>
					<div className='row mb-4'>
						<div className='col'>
							<h5 className='text-center'>Payment Method</h5>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12'>
							<button className='btn btn-primary btn-sm' onClick={handlePurchase}>
								Confirm Purchase
							</button>
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='row mb-4'>
						<div className='col'>
							<h5 className='text-center'>Products in Cart</h5>
						</div>
					</div>
					<div className='row mb-5'>
						<div className='col gx-2'>{formatProducts()}</div>
					</div>
					<div className='row'>
						<div className='col'>
							<p className='text-start m-0 fs-5 text-primary'>Total</p>
						</div>
						<div className='col'>
							<p className='fs-5 text-primary text-end m-0'>${cartTotal} USD</p>
						</div>
					</div>
				</div>
			</div>
			{error.state && error.stack !== null ? (
				<div className='row gy-5'>
					<div className='alert alert-danger' role='alert'>
						<div className='col-12'>
							<p className='m-0 fs-6'>An error has occurred:</p>
						</div>
						<div className='col-12'>
							<p className='m-0 fs-6'>{error.stack}</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

// ! Exports
export default Checkout;
