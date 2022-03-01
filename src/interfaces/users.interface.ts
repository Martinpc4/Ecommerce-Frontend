// ! Imports
// * Interfaces
import { Types } from 'mongoose';

// ! Interfaces Definitions
export interface phonePropertiesInterface {
	extension: number;
	number: number;
}
export interface emailPropertiesInterface {
	email: string;
	verified: boolean;
	verification_code: Types.ObjectId | null;
}
export interface addressPropertiesInterface {
	postalCode: number;
	street: string;
	streetNumber: number;
	city: string;
	country: string;
	state: string;
}
export interface linkedAccountsPropertiesInterface {
	facebook: string | null;
	github: string | null;
}
export interface userProfileInterface {
	_id: Types.ObjectId;
	name: string;
	lastName: string;
	timeStamp: Date;
	email: emailPropertiesInterface;
	cartId: Types.ObjectId | null;
	address: addressPropertiesInterface;
	phoneNumber: phonePropertiesInterface;
	linkedAccounts: linkedAccountsPropertiesInterface;
}