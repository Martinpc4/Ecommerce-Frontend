// ! Imports
// * Modules
import * as React from 'react';
// * DTOs
import { CartProductDTO } from '../DTOs/product.dto';
import { UserDTO } from '../DTOs/user.dto';
// * Interfaces
import { messagePropertiesInterface } from './message.interface';
import { Types } from 'mongoose';
import { Socket } from 'socket.io-client';

// ! Context Types Defintions
// * Auth Context Types
export interface AuthContextInterface {
	Token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// * Cart Context Types
export interface CartContextInterface {
	setCartRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	CartId: Types.ObjectId | null;
	cartProducts: CartProductDTO[];
	cartAmount: number;
	cartTotal: number;
}
// * Socket Context Types
export interface SocketContextInterface {
	socket: Socket | null;
	messages: messagePropertiesInterface[];
	setMessages: React.Dispatch<React.SetStateAction<messagePropertiesInterface[]>>;
}

// * User Context Types
export interface UserContextInterface {
	User: UserDTO | null;
	setUserRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

// ! Components Props Types Definitions
// * ItemList Component's Props Types
export interface ItemListProps {
	categoryId: number;
}
// * CartList Component's Props Types
export interface CartListProps {
	listModel: number;
}
// * ItemCart Component's Props Types
export interface ItemProps {
	_id: Types.ObjectId;
	categoryId: number;
	name: string;
	imagesURL: string[];
	memory: number;
	price: number;
}
// * ItemCart Component's Props Types
export interface ItemCartProps {
	productProperties: CartProductDTO;
	listModel: number;
}
// * ItemCounter Component's Props Types
export interface ItemCounterProps {
	itemAmount: number;
	itemAmountFunction: React.Dispatch<React.SetStateAction<number>>;
	applyChangesFunction?: () => void;
	cartItemAmount?: number;
	isApplyChanges?: boolean;
	stockState?: boolean;
}

// ! General Component Types Definitions

// * Checkout Component
export interface CheckoutErrorInterface {
	state: boolean;
	stack: string | null;
}
// * Error Component
export interface ErrorInterface {
	id: number;
	title: string | undefined;
	description: string | undefined;
}
// * Checkout Component
export interface PurchaseStateInterface {
	state: boolean;
	receiptId: string | undefined;
}
export interface paymentDetails {
	name: string;
	lastName: string;
	card: {
		number: number;
		security_code: number;
		expire: {
			month: number;
			year: number;
		};
	};
}
// * Signup Component
export interface userDataInterface {
	name: undefined | string;
	email: undefined | string;
	password: undefined | string;
	lastName: undefined | string;
	postalCode: undefined | number;
	city: undefined | string;
	street: undefined | string;
	streetNumber: undefined | number;
	country: undefined | string;
	state: undefined | string;
	phoneNumber: undefined | number;
	phoneExtension: undefined | number;
}
