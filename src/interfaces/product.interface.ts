// ! Imports
// * Interfaces
import { Types } from 'mongoose';

// ! Interfaces Dfinitions
export interface productPropertiesInterface {
	_id: Types.ObjectId;
	categoryId: number;
	name: string;
	description: string;
	price: number;
	imagesURL: string[];
	timeStamp: Date;
	stock: number[];

	colors: string[];
	memory: number;
}
export interface cartProductsInterface {
	_id: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	imagesURL: string[];
	timeStamp: Date;
	categoryId: number;
	color: string;
	memory: number;
	amount: number;
}
export interface productPropertiesDisplayInterface {
	_id: Types.ObjectId;
	categoryId: number;
	title: string;
	price: number;
	description: string;
	memory: number;
	imagesURL: string[];
	colors?: string[];
	imagesBootstrapComponents: JSX.Element[];
	carouselIndicators: JSX.Element[];
}
export interface genericProductPropertiesInterface {
	_id: Types.ObjectId;
	categoryId: number;
	name: string;
	description: string;
	price: number;
	imagesURL: string[];
	timeStamp: Date;
	memory: number;
}
export interface productColorsInterface {
	value: string;
	label: string;
	isDisabled: boolean;
}
export interface productDisplayPropertiesInterface extends productPropertiesInterface {
	imagesBootstrapComponents: JSX.Element[];
	carouselIndicators: JSX.Element[];
}
