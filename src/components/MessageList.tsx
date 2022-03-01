// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import SocketContext from './contexts/Socket';
import AuthContext from './contexts/Auth';
// * React Components
import Message from './Message';

// ! Component Definition
function MessageList() {
	const { socket, messages } = useContext(SocketContext);
	const { Token } = useContext(AuthContext);
	const [messagesComponents, setMessagesComponents] = useState<JSX.Element[]>([]);

	if (socket === null) {
		throw new Error('Socket is null');
	}

	useEffect(() => {
		let formattedMessages: JSX.Element[] = [];
		messages.forEach((messageProperties) => {
			formattedMessages.push(
				<div key={`div-${messageProperties._id}`} className='row'>
					<Message
						key={`message-${messageProperties._id}`}
						content={messageProperties.content}
						timeStamp={messageProperties.timeStamp}
						type={messageProperties.type}
						userId={messageProperties.userId}
						_id={messageProperties._id}
					/>
				</div>
			);
		});
		setMessagesComponents(formattedMessages);
	}, [Token, messages]);

	return <div className='container'>{messagesComponents}</div>;
}

// ! Exports
export default MessageList;
