// ! Imports
// * Modules
import React from 'react';
// * Interfaces
import { UserContextInterface } from '../../interfaces/components.interface';

// ! Context Definition
const UserDefaultValue: UserContextInterface = {
	User: null,
	setUserRefresh: () => {},
};

const User = React.createContext<UserContextInterface>(UserDefaultValue);

// ! Exports
export default User;
