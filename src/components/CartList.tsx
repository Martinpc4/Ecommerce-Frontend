// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
import CartContext from './contexts/Cart';
// * React Components
import ItemCart from './ItemCart';
// * DTOs
import { CartProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { AuthContextInterface, CartContextInterface, CartListProps } from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function CartList({ listModel }: CartListProps): JSX.Element {
	const navigate: NavigateFunction = useNavigate();

	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { CartId, cartProducts } = useContext<CartContextInterface>(CartContext);

	const [change, setChange] = useState<boolean>(false);
	const [JSXProducts, setJSXProducts] = useState<JSX.Element[]>([]);

	async function formatProducts(): Promise<void> {
		let itemCartList: JSX.Element[] = [];
		cartProducts.forEach((productProperties: CartProductDTO): void => {
			itemCartList.push(
				<ItemCart
					key={`${productProperties._id}-${productProperties.color}`}
					productProperties={productProperties}
					listModel={listModel}
				/>
			);
		});
		setJSXProducts(itemCartList);
	}

	useEffect((): void => {
		(async () => {
			if (Token === null) {
				navigate('/Login');
			} else if (CartId !== null) {
				await formatProducts();
			}
		})();
	}, [Token, CartId, cartProducts]);

	useEffect(() => {
		(async () => {
			if (change && Token !== null && CartId !== null) {
				await formatProducts();
				setChange(false);
			}
		})();
	}, [change]);

	if (Token !== null && CartId !== null && JSXProducts.length > 0) {
		return <>{JSXProducts}</>;
	} else {
		return (
			<div className='container h-100'>
				<div className='row h-100 align-items-center'>
					<p className={`text-center mx-0 my-3 ${listModel === 1 ? 'fs-6' : 'fs-4'}`}>No products yet!</p>
				</div>
			</div>
		);
	}
}

// ! Exports
export default CartList;
