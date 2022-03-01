// ! Imports
// * React Hooks
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// * Interfaces
import { ErrorInterface } from '../interfaces/components.interface';

// ! Component Definition
const Error: React.FC = () => {
	const { ErrorId } = useParams();

	useEffect(() => {}, [ErrorId]);

	let error: ErrorInterface = {
		id: Number(ErrorId),
		title: undefined,
		description: undefined,
	};

	if (error.id === 1) {
		error.title = 'Product has not been found';
		error.description = 'The product id requested is invalid';
	} else if (error.id === 2) {
		error.title = 'Error happened while requesting data';
		error.description =
			'The requested information to the server could not be correctly retrieved. Please, do try again later';
	} else if (error.id === 3) {
		error.title = 'Internal server error';
		error.description = 'The desired operation could not be performed correctly. Please, do try again later';
	} else if (error.id === 401) {
		error.title = 'Bad Access';
		error.description = 'User could not be authenticated';
	} else {
		error.title = 'Errod code not found';
		error.description = undefined;
	}

	return (
		<div className='container'>
			<div className='row h-100 gy-2 align-items-center align-content-center'>
				<div className='col-12'>
					<p className='text-center m-0 text-dark fs-3'>{error.title}</p>
				</div>
				<div className='col-12'>
					<p className='text-center lead m-0 text-dark fs-5'>{error.description}</p>
				</div>
			</div>
		</div>
	);
};

// ! Exports
export default Error;