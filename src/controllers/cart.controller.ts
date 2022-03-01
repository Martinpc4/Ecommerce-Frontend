// ! Imports
// * Controllers
import ProductsController from './product.controller';
// * DTOs
import { CartProductDTO, ProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { cartProductsInterface } from '../interfaces/product.interface';
import { Types } from 'mongoose';

// ! Controller Definition
class CartsControllerClass {
	async createCart(Token: string): Promise<boolean> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts`, {
				method: 'POST',
				headers: { Authorization: Token },
			});
			return res.status === 200;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async deleteCart(Token: string): Promise<boolean> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts`, {
				method: 'DELETE',
				headers: { Authorization: Token },
			});
			return res.status === 200;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getAllProducts(Token: string): Promise<CartProductDTO[]> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts/products`, {
				method: 'GET',
				headers: { Authorization: Token },
			});
			if (res.status === 200) {
				const products: cartProductsInterface[] = await res.json();
				let productsList: CartProductDTO[] = [];

				products.forEach((productProperties: cartProductsInterface) => {
					productsList.push(new CartProductDTO(productProperties));
				});
				return productsList;
			} else {
				throw new Error('Products could not be recovered from server');
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getProduct(Token: string, productId: Types.ObjectId, color: string): Promise<CartProductDTO | null> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts/products/${productId}`, {
				method: 'POST',
				headers: { Authorization: Token, 'Content-Type': 'application/json' },
				body: JSON.stringify({ _id: productId, color }),
			});
			if (res.status === 200) {
				const product: cartProductsInterface = await res.json();
				return new CartProductDTO(product);
			} else {
				return null;
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async modifyProduct(Token: string, product: CartProductDTO): Promise<boolean> {
		try {
			const res: Response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/carts/products/${product._id}`,
				{
					method: 'PUT',
					headers: { Authorization: Token, 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...product }),
				}
			);
			return res.status === 200;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async addProductToCart(Token: string, cartId: Types.ObjectId | null, product: CartProductDTO): Promise<boolean> {
		try {
			let flagVar: boolean = true;
			if (cartId === null) {
				flagVar = await this.createCart(Token);
			}
			if (flagVar) {
				const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts/products`, {
					method: 'POST',
					headers: { Authorization: Token, 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...product }),
				});
				return res.status === 200;
			} else {
				return false;
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async deleteProductFromCart(Token: string, product: CartProductDTO): Promise<boolean> {
		try {
			const res: Response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/carts/products/${product._id}`,
				{
					method: 'DELETE',
					headers: { Authorization: Token, 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...product }),
				}
			);
			return res.status === 200;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async emptyCart(Token: string): Promise<boolean> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts/products`, {
				method: 'DELETE',
				headers: { Authorization: Token },
			});
			return res.status === 200;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async checkoutCart(Token: string): Promise<Response> {
		try {
			return await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/carts/checkout`, {
				method: 'POST',
				headers: { Authorization: Token },
			});
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async checkStock(Token: string): Promise<boolean> {
		try {
			let flagVar: boolean = true;
			const products: CartProductDTO[] = await this.getAllProducts(Token);
			for (const product of products) {
				const dbProduct: ProductDTO = await ProductsController.getProductById(product._id);
				if (
					!(
						dbProduct._id === product._id &&
						dbProduct.stock[dbProduct.colors.indexOf(product.color)] !== -1 &&
						dbProduct.stock[dbProduct.colors.indexOf(product.color)] >= product.amount
					)
				) {
					flagVar = false;
				}
			}
			return flagVar;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getTotal(Token: string): Promise<number> {
		try {
			const products: CartProductDTO[] = await this.getAllProducts(Token);
			let total: number = 0;
			products.forEach((product: CartProductDTO) => {
				total += product.price * product.amount;
			});
			return total;
		} catch (err: any) {
			throw new Error(err);
		}
	}
}

// ! Controller Instance
const CartController: CartsControllerClass = new CartsControllerClass();

// ! Exports
export default CartController;
