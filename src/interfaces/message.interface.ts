// ! Imports
import { Types } from 'mongoose';

// ! Types Defintions
enum MessageTypeEnum {
	user = 'USER',
	system = 'SYSTEM',
	admin = 'ADMIN',
}
interface messagePropertiesInterface {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	type: MessageTypeEnum;
	timeStamp: Date;
	content: string;
}

// ! Exports
export type { messagePropertiesInterface };
export { MessageTypeEnum };
