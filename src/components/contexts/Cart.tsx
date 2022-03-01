// ! Imports
// * Modules
import React from 'react';
// * Interfaces
import { CartContextInterface } from '../../interfaces/components.interface';

// ! Context Definition
const CartDefaultValue: CartContextInterface = {
	CartId: null,
	cartProducts: [],
	cartTotal: 0,
	cartAmount: 0,
	setCartRefresh: () => {},
};

const Auth = React.createContext<CartContextInterface>(CartDefaultValue);

// ! Exports
export default Auth;
