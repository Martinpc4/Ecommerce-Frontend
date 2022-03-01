// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import CartContext from './Cart';
import AuthContext from './Auth';
import UserContext from './User';
// * Controllers
import CartController from '../../controllers/cart.controller';
// * DTOs
import { CartProductDTO } from '../../DTOs/product.dto';
// * Interfaces
import { AuthContextInterface, UserContextInterface } from '../../interfaces/components.interface';
import { Types } from 'mongoose';

// ! Provider Definition
function CartProvider({ children }: any): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { User } = useContext<UserContextInterface>(UserContext);

	const [cartRefresh, setCartRefresh] = useState<boolean>(false);
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [cartAmount, setCartAmount] = useState<number>(0);

	const [cartProducts, setCartProducts] = useState<CartProductDTO[]>([]);
	const [CartId, setCartId] = useState<Types.ObjectId | null>(() => {
		if (User !== null) {
			return User.cartId;
		} else {
			return null;
		}
	});

	function fetchCartId(): void {
		if (User !== null) {
			const cartId: Types.ObjectId | null = User.cartId;
			setCartId(cartId);
		}
	}

	async function fetchCartProducts(token: string): Promise<void> {
		setCartProducts(await CartController.getAllProducts(token));
	}

	async function fetchCartTotal(token: string): Promise<void> {
		setCartTotal(await CartController.getTotal(token));
	}

	function getCartProductsAmount(): void {
		let total: number = 0;
		cartProducts.forEach((product: CartProductDTO) => {
			total += product.amount;
		});
		setCartAmount(total);
	}

	useEffect(() => {
		if (Token !== null) {
			fetchCartId();
		} else {
			setCartId(null);
		}
	}, [User]);
	useEffect(() => {
		(async () => {
			if (Token !== null && CartId !== null) {
				await fetchCartProducts(Token);
			} else {
				setCartProducts([]);
			}
			if (cartRefresh) {
				setCartRefresh(false);
			}
		})();
	}, [CartId, cartRefresh]);
	useEffect(() => {
		(async () => {
			if (Token !== null) {
				if (CartId !== null) {
					await fetchCartTotal(Token);
					getCartProductsAmount();
				} else {
					setCartTotal(0);
					setCartAmount(0);
				}
			}
		})();
	}, [cartProducts]);

	return (
		<CartContext.Provider
			value={{
				CartId,
				setCartRefresh,
				cartAmount,
				cartProducts,
				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

// ! Exports
export default CartProvider;
