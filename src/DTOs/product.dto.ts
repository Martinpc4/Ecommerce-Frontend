// ! Imports
// * Interfaces
import {
	cartProductsInterface,
	genericProductPropertiesInterface,
	productPropertiesInterface,
	productDisplayPropertiesInterface
} from '../interfaces/product.interface';
import { Types } from 'mongoose';

// ! DTOs Defintions
// * Generic Product Class
class GenericProductDTO implements genericProductPropertiesInterface {
	_id: Types.ObjectId;
	categoryId: number;
	name: string;
	description: string;
	price: number;
	imagesURL: string[];
	timeStamp: Date;
	memory: number;

	constructor(genericProductProperties: genericProductPropertiesInterface) {
		this._id = genericProductProperties._id;
		this.categoryId = genericProductProperties.categoryId;
		this.name = genericProductProperties.name;
		this.description = genericProductProperties.description;
		this.price = genericProductProperties.price;
		this.imagesURL = genericProductProperties.imagesURL;
		this.timeStamp =
			genericProductProperties.timeStamp !== undefined ? genericProductProperties.timeStamp : new Date();
		this.memory = genericProductProperties.memory;
	}
}

// * Cart Product Class
class CartProductDTO extends GenericProductDTO implements cartProductsInterface {
	color: string;
	amount: number;

	constructor(cartProductProperties: cartProductsInterface) {
		super(cartProductProperties);
		this.amount = cartProductProperties.amount;
		this.color = cartProductProperties.color;
	}
}

// * Product Class
class ProductDTO extends GenericProductDTO implements productPropertiesInterface {
	stock: number[];
	colors: string[];

	constructor(productProperties: productPropertiesInterface) {
		super(productProperties);
		this.stock = productProperties.stock;
		this.colors = productProperties.colors;
	}
}

// * Display Product Class
class DisplayProductDTO extends ProductDTO implements productDisplayPropertiesInterface {
	imagesBootstrapComponents: JSX.Element[];
	carouselIndicators: JSX.Element[];
	constructor(productProperties: productDisplayPropertiesInterface) {
		super(productProperties);
		this.imagesBootstrapComponents = productProperties.imagesBootstrapComponents;
		this.carouselIndicators = productProperties.carouselIndicators;
	}
}

// ! Exports
export { ProductDTO, CartProductDTO, DisplayProductDTO };
