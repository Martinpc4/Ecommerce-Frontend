// ! Imports
// * Interfaces
import {
	userProfileInterface,
	phonePropertiesInterface,
	linkedAccountsPropertiesInterface,
	emailPropertiesInterface,
	addressPropertiesInterface,
} from '../interfaces/users.interface';
import { Types } from 'mongoose';

// ! DTO Definition
class UserDTO implements userProfileInterface {
	name: string;
	_id: Types.ObjectId;
	lastName: string;
	timeStamp: Date;
	email: emailPropertiesInterface;
	cartId: Types.ObjectId | null;
	address: addressPropertiesInterface;
	phoneNumber: phonePropertiesInterface;
	linkedAccounts: linkedAccountsPropertiesInterface;
	constructor(userProperties: userProfileInterface) {
		this._id = userProperties._id;
		this.name = userProperties.name;
		this.lastName = userProperties.lastName;
		this.timeStamp = userProperties.timeStamp;
		this.email = {
			email: userProperties.email.email,
			verified: userProperties.email.verified,
			verification_code:
				userProperties.email.verification_code !== null ? userProperties.email.verification_code : null,
		};
		this.cartId = userProperties.cartId;
		this.address = {
			street: userProperties.address.street,
			city: userProperties.address.city,
			state: userProperties.address.state,
			streetNumber: userProperties.address.streetNumber,
			postalCode: userProperties.address.postalCode,
			country: userProperties.address.country,
		};
		this.phoneNumber = userProperties.phoneNumber;
		this.linkedAccounts = userProperties.linkedAccounts;
	}
}

// ! Exports
export { UserDTO };
