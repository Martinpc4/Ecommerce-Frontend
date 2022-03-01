// ! Imports
// * React Hooks
import { useContext, useState } from 'react';
// * React Contexts
import CartContext from './contexts/Cart';
// * React Components
import CartList from './CartList';
import { Link } from 'react-router-dom';
// * Interfaces
import { CartContextInterface } from '../interfaces/components.interface';
import { MouseEvent } from 'react';

// ! Component Definition
function CartWidget(): JSX.Element {
	const [clickedState, setClickedState] = useState<boolean>(false);

	const { CartId, cartTotal, cartAmount } = useContext<CartContextInterface>(CartContext);

	function modifyClickedState(e: MouseEvent): void {
		e.stopPropagation();
		if (clickedState) {
			setClickedState(false);
		} else {
			setClickedState(true);
		}
	}

	return (
		<>
			<div className='position-relative d-flex justify-content-center align-items-center'>
				<i
					className='bi fs-4 bi-cart d-flex flex-row align-items-center justify-content-end'
					style={{ fontSize: '2rem' }}
					onClick={modifyClickedState}
				/>
				{CartId !== null && cartAmount > 0 ? (
					<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
						{cartAmount <= 99 ? cartAmount : '99+'}
					</span>
				) : null}
			</div>
			{clickedState ? (
				<Link
					to='/Cart'
					className='user-select-auto text-decoration-none text-dark cart-widget w-25'
					onClick={modifyClickedState}
				>
					<div className='container gy-1 bg-light border py-2'>
						<div className='row'>
							<p className='m-0 fs-5 text-center'>Products</p>
						</div>
						<div className='row py-3'>
							<div className='col-12'>
								<CartList listModel={1} />
							</div>
						</div>
						{CartId !== null && cartTotal !== null && cartTotal > 0 ? (
							<div className='row align-items-center border-top py-2'>
								<div className='col-6'>
									<div className='row'>
										<p className='m-0 text-start'>Total</p>
									</div>
								</div>
								<div className='col-6'>
									<div className='row'>
										<p className='m-0 text-end price'>{cartTotal} USD$</p>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</Link>
			) : null}
		</>
	);
}

// ! Exports
export default CartWidget;
