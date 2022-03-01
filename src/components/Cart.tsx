// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
import CartContext from './contexts/Cart';
// * React Components
import CartList from './CartList';
// * Controllers
import CartController from '../controllers/cart.controller';
// * Interfaces
import { AuthContextInterface, CartContextInterface } from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function Cart(): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { CartId, cartProducts, cartTotal } = useContext<CartContextInterface>(CartContext);

	const [purchaseValid, setPurchaseValid] = useState<boolean>(false);

	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		async function checkCartStock(): Promise<void> {
			if (Token !== null) {
				const stockState: boolean = await CartController.checkStock(Token);
				console.log(stockState);
				if (stockState) {
					setPurchaseValid(true);
				} else {
					setPurchaseValid(false);
				}
			}
		}

		(async () => {
			if (CartId !== null && cartProducts.length > 0) {
				await checkCartStock();
			}
		})();
	}, [CartId, purchaseValid, cartProducts]);

	return (
		<div className='container'>
			<div className='row h-100'>
				<div className='py-2 col-12 d-flex flex-column justify-content-between'>
					<div className='row mb-5 gy-2 h-100 align-items-center align-content-start'>
						<CartList listModel={2} />
					</div>
					{cartProducts.length > 0 && cartTotal > 0 ? (
						<div className='row align-items-center'>
							<div className='col-6'>
								<div className='row'>
									<p className='m-0 text-start fs-5'>Total</p>
								</div>
							</div>
							<div className='col-4'>
								<div className='row'>
									<p className='m-0 text-end price fs-5'>{cartTotal} USD</p>
								</div>
							</div>
							<div className='col-2'>
								<div className='row'>
									{purchaseValid ? (
										<button
											onClick={() => {
												navigate('/Checkout');
											}}
											className={`btn btn-primary w-100`}
										>
											Checkout
										</button>
									) : (
										<button className={`btn btn-primary w-100 disabled`}>Checkout</button>
									)}
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

// ! Exports
export default Cart;
