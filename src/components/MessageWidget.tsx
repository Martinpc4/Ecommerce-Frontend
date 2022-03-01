// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import SocketContext from './contexts/Socket';
import AuthContext from './contexts/Auth';
import UserContext from './contexts/User';
// * React Components
import MessageList from './MessageList';
// * Interfaces
import { MessageTypeEnum } from '../interfaces/message.interface';

// ! Component Definition
function MessageWidget() {
	const { socket } = useContext(SocketContext);
	const { Token } = useContext(AuthContext);
	const { User } = useContext(UserContext);
	const [messageToSend, setMessageToSend] = useState('');
	const [messageValueToSend, setMessageValueToSend] = useState('');
	const [clickedState, setClickedState] = useState(false);

	useEffect(() => {}, [clickedState, Token]);

	if (socket === null || Token === null) {
		return <></>;
	}
	function emitMessage() {
		if (socket === null || User === null || Token === null) {
			return;
		}
		console.log('emmiting messages');
		socket.emit('message-send', {
			content: messageToSend,
			timeStamp: new Date(),
			userId: User._id,
			type: MessageTypeEnum.user,
		});
		console.log('Message sent');
	}

	return (
		<>
			{!clickedState ? (
				<div className='messagesWidgetIcon'>
					<i
						className='bi bi-chat fs-2 d-flex flex-row align-items-center justify-content-end'
						onClick={() => setClickedState(!clickedState)}
					/>
				</div>
			) : null}
			{clickedState ? (
				<div className='messagesWidget p-2'>
					<div className='messagesWidget__header row'>
						<div className='col'>
							<p className='fs-5 m-0'>Messages</p>
						</div>
						<div className='col'>
							<i
								className='bi bi-x fs-2 d-flex flex-row align-items-center justify-content-end'
								onClick={() => setClickedState(!clickedState)}
							/>
						</div>
					</div>
					<div className='messagesWidget__messages-ctr row'>
						<MessageList />
					</div>
					<div className='messagesWidget__form row'>
						<div className='col-8'>
							<input
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.value.trim() === '' || e.target.value.trim().length <= 0) {
										e.target.className = 'form-control is-invalid';
									} else {
										e.target.className = 'form-control';
										setMessageToSend(e.target.value);
									}
									setMessageValueToSend(e.target.value);
								}}
								value={messageValueToSend}
								className='form-control'
								type='text'
								name='message'
							/>
						</div>
						<div className='invalid-feedback'>Invalid Message</div>
						<div className='col-4 d-flex'>
							<input
								className='btn btn-primary btn-sm'
								type='submit'
								onClick={(e) => {
									e.preventDefault();
									emitMessage();
								}}
							/>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

// ! Exports
export default MessageWidget;