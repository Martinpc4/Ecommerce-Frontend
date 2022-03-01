// ! Imports
// * Interfaces
import { messagePropertiesInterface } from '../interfaces/message.interface';

// ! Component Defintion
function Message({ _id, content, timeStamp, userId, type }: messagePropertiesInterface) {
	return (
		<div className='container mb-2'>
			<div className='row px-2'>
				<div className='col-12'>
					<p style={{ fontSize: '15px' }} className='m-0 p-0 text-muted'>
						{type.charAt(0)}
						{type.toLowerCase().slice(1)}
					</p>
				</div>
				<div className='col-12'>
					<p style={{ fontSize: '14px' }} className='m-0 p-0'>
						{content}
					</p>
				</div>
			</div>
		</div>
	);
}

// ! Exports
export default Message;
