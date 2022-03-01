// ! Imports
// * React Hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
// * Interfaces
import { ChangeEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AuthContextInterface } from '../interfaces/components.interface';

// ! Component Definition
function Login(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const [username, setUsername] = useState('');
	const [usernameValid, setUsernameValid] = useState<boolean>(true);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);
	const { setToken } = useContext<AuthContextInterface>(AuthContext);

	async function handleLogin(e: React.MouseEvent<HTMLInputElement, MouseEvent>): Promise<void> {
		e.preventDefault();
		let flagVar: boolean = true;
		if (password === '' || password.length < 8) {
			flagVar = false;
			setPasswordValid(false);
		} else {
			setPasswordValid(true);
		}
		if (username === '' || username.search('@') === -1) {
			flagVar = false;
			setUsernameValid(false);
		} else {
			setUsernameValid(true);
		}
		if (flagVar) {
			const response: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ username, password }),
			});
			if (response.status === 200) {
				const data = await response.json();
				setToken(data.token);
				navigate('/');
			} else {
				console.error('Invalid Credentials');
			}
		}
	}

	return (
		<div style={{ maxWidth: '400px', maxHeight: '500px', margin: 'auto' }} className='container'>
			<div className='row'>
				<div className='col-12'>
					<h4 className='text-center'>User Login</h4>
				</div>
			</div>
			<div className='row mb-3'>
				<form action={`${process.env.REACT_APP_BACKEND_URL}/auth/login`} method='post'>
					<div className='my-3 col-12 mb-2'>
						<label htmlFor='username'>Username</label>
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setUsername(e.target.value.trim());
							}}
							className={usernameValid ? 'form-control' : 'form-control is-invalid'}
							type='email'
							name='username'
						/>
						<div className='invalid-feedback'>Please provide a username</div>
					</div>
					<div className='my-3 col-12'>
						<label htmlFor='password'>Password</label>
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value.trim());
							}}
							className={passwordValid ? 'form-control' : 'form-control is-invalid'}
							type='password'
							name='password'
						/>
						<div className='invalid-feedback'>Please provide a password of at least 10 characters</div>
					</div>
					<div className='col-12'>
						<div className='row'>
							<div className='col'>
								<input
									onClick={async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
										await handleLogin(e);
									}}
									className='btn btn-primary mx-2'
									type='submit'
									value='Login'
								/>
								<input
									onClick={() => {
										navigate('/signup');
									}}
									className='btn btn-primary'
									type='button'
									value='Sign up'
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className='row justify-content-center'>
				<div className='col-2 d-flex justify-content-center align-items-center'>
					<button
						style={{
							backgroundColor: '#1877F2',
							maxWidth: '40px',
							maxHeight: '40px',
						}}
						type='button'
						onClick={() => {
							window.location.replace(`${process.env.REACT_APP_BACKEND_URL}/auth/facebook`);
						}}
						className='btn rounded-circle d-flex justify-content-center align-items-center'
					>
						<i
							style={{
								color: 'white',
								marginTop: '2px',
							}}
							className='bi bi-facebook'
						></i>
					</button>
				</div>
				<div className='col-2 d-flex justify-content-center  align-items-center'>
					<button
						style={{
							backgroundColor: '#181717',
							maxWidth: '40px',
							maxHeight: '40px',
						}}
						type='button'
						onClick={() => {
							window.location.replace(`${process.env.REACT_APP_BACKEND_URL}/auth/github/login`);
						}}
						className='btn rounded-circle d-flex justify-content-center align-items-center'
					>
						<i
							style={{
								color: 'white',
								marginTop: '2px',
							}}
							className='bi bi-github'
						></i>
					</button>
				</div>
			</div>
		</div>
	);
}

// ! Exports
export default Login;
