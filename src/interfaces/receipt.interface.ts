// ! Imports
// * Interfaces
import {Types} from 'mongoose';

// ! Interfaces Definitions
export interface receiptPropertiesInterface {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	cartId: Types.ObjectId;
	total: number;
	timeStamp: Date;
}
