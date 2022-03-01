// ! Imports
// * Modules
import React from 'react';
// * Interfaces
import { SocketContextInterface } from '../../interfaces/components.interface';

// ! Context Definition
const SocketDefaultValue: SocketContextInterface = {
	socket: null,
	messages: [],
	setMessages: () => {},
};

const Socket = React.createContext<SocketContextInterface>(SocketDefaultValue);

// ! Exports
export default Socket;
