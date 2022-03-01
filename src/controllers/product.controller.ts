// ! Imports
// * DTOs
import { ProductDTO } from '../DTOs/product.dto';
// * Interfaces
import { productPropertiesInterface } from '../interfaces/product.interface';
import { Types } from 'mongoose';

// ! Controller Definition
class ProductsControllerClass {
	async getAllProducts(): Promise<ProductDTO[]> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
				method: 'GET',
			});
			if (res.status === 200) {
				const products: productPropertiesInterface[] = await res.json();
				let productsList: ProductDTO[] = [];

				products.forEach((productProperties: productPropertiesInterface) => {
					productsList.push(new ProductDTO(productProperties));
				});

				return productsList;
			} else {
				throw new Error('Products could not be recovered from server');
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getProductById(_id: Types.ObjectId): Promise<ProductDTO> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${_id}`, {
				method: 'GET',
			});
			if (res.status === 200) {
				const product: productPropertiesInterface = await res.json();
				return new ProductDTO(product);
			} else {
				throw new Error('Product could not be recovered from server');
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getProductCategoryById(categoryId: number): Promise<ProductDTO[]> {
		try {
			const res: Response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/products/category/${categoryId}`,
				{
					method: 'GET',
				}
			);
			if (res.status === 200) {
				const products: productPropertiesInterface[] = (await res.json()).products;
				let productsList: ProductDTO[] = [];

				products.forEach((productProperties: productPropertiesInterface) => {
					productsList.push(new ProductDTO(productProperties));
				});

				return productsList;
			} else {
				throw new Error('Products could not be recovered from server');
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async validateStock(productId: Types.ObjectId, amount: number, color: string): Promise<boolean> {
		try {
			const product: ProductDTO = await this.getProductById(productId);
			return product.stock[product.colors.indexOf(color)] >= amount;
		} catch (err: any) {
			throw new Error(err);
		}
	}
}

// ! Controller Instance
const ProductsController: ProductsControllerClass = new ProductsControllerClass();

// ! Exports
export default ProductsController;
