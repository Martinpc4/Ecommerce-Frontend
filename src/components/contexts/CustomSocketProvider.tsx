// ! Imports
// * Modules
import { io, Socket } from 'socket.io-client';
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import SocketContext from './Socket';
import AuthContext from './Auth';
// * DTOs
import { MessageDTO } from '../../DTOs/message.dto';
// * Interfaces
import { AuthContextInterface } from '../../interfaces/components.interface';

// ! Provider Definition
function SocketProvider({ children }: any): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const [messages, setMessages] = useState<MessageDTO[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);

	function createSocket() {
		console.log('ESTABLISHING SOCKET CONNECTION');
		const socketCreated: Socket = io(String(process.env.REACT_APP_BACKEND_URL), {
			auth: { Token },
			transports: ['websocket'],
			upgrade: false,
			withCredentials: true,
		});
		socketCreated.on('messages', (messageProperties) => {
			setMessages((messages) => [...messages, messageProperties]);
		});
		return socketCreated;
	}

	useEffect(() => {
		console.log('TOKEN CHANGED');
		console.log(Token);
		if (Token !== null) {
			setSocket(createSocket());
		}
	}, [Token]);

	if (Token === null) {
		return <>{children}</>;
	}

	console.log('SOCKET CONTEXT MOUNTED');

	return (
		<SocketContext.Provider
			value={{
				socket,
				messages,
				setMessages,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}

// ! Exports
export default SocketProvider;
