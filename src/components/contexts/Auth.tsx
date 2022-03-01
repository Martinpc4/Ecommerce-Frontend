// ! Imports
// * Modules
import React from 'react';
// * Interfaces
import { AuthContextInterface } from '../../interfaces/components.interface';

// ! Context Definition
const AuthDefaultValue: AuthContextInterface = {
	Token: null,
	setToken: () => {},
};

const Auth = React.createContext<AuthContextInterface>(AuthDefaultValue);

// ! Exports
export default Auth;
