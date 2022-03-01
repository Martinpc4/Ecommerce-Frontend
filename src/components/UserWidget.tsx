// ! Imports
// * React Hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
// * Interfaces
import { NavigateFunction } from 'react-router-dom';
import { AuthContextInterface } from '../interfaces/components.interface';

// ! Component Defintion
function UserWidget(): JSX.Element {
	const [clickedState, setClickedState] = useState<boolean>(false);
	const { Token, setToken } = useContext<AuthContextInterface>(AuthContext);
	const navigate: NavigateFunction = useNavigate();

	function modifyClickedState(e: React.MouseEvent): void {
		e.stopPropagation();
		if (clickedState) {
			setClickedState(false);
		} else {
			setClickedState(true);
		}
	}

	return (
		<>
			<div className='position-relative d-flex justify-content-center align-items-center'>
				<i className='bi bi-person-circle' onClick={modifyClickedState} style={{ fontSize: '1.3rem' }} />
			</div>
			{clickedState && Token === null ? (
				<div style={{ minWidth: '100px', position: 'absolute', top: '3.95rem', right: '5.4vw' }}>
					<div className='container bg-light border py-2'>
						<div className='row mb-2'>
							<div
								onClick={() => {
									setClickedState(false);
									navigate('/Login');
								}}
								className='text-black-50'
							>
								<input type='button' className='btn btn-primary btn-sm' name='loginBtn' value='Login' />
							</div>
						</div>
						<div className='row'>
							<div
								onClick={() => {
									setClickedState(false);
									navigate('/signup');
								}}
								className='text-black-50'
							>
								<input
									type='button'
									className='btn btn-primary btn-sm'
									name='signupBtn'
									value='Sign Up'
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
			{clickedState && Token !== null ? (
				<div style={{ minWidth: '100px', position: 'absolute', top: '3.95rem', right: '5.4vw' }}>
					<div className='container bg-light border py-2'>
						<div className='row mb-2'>
							<div
								onClick={() => {
									setClickedState(false);
									navigate('/profile');
								}}
								className='text-black-50'
							>
								<input
									type='button'
									className='btn btn-primary btn-sm'
									name='profileBtn'
									value='Profile'
								/>
							</div>
						</div>
						<div className='row'>
							<div
								onClick={() => {
									setClickedState(false);
									localStorage.removeItem('token');
									setToken(null);
									navigate('/');
								}}
								className='text-black-50'
							>
								<input
									type='button'
									className='btn btn-primary btn-sm'
									name='logoutBtn'
									value='Logout'
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

// ! Exports
export default UserWidget;
