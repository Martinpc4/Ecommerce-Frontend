// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import UserContext from './contexts/User';
import AuthContext from './contexts/Auth';
// * Interfaces
import { NavigateFunction } from 'react-router-dom';
import { AuthContextInterface, UserContextInterface } from '../interfaces/components.interface';

// ! Component Definition
function UserPasswordUpdate(): JSX.Element | null {
	const navigate: NavigateFunction = useNavigate();

	const { User } = useContext<UserContextInterface>(UserContext);
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	interface changePasswordValues {
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
	}

	const defaultValue: changePasswordValues = {
		newPassword: '',
		oldPassword: '',
		confirmPassword: '',
	};
	const [userPassword, setUserPassword] = useState<changePasswordValues>(defaultValue);
	const [userValue, setUserValue] = useState<changePasswordValues>(defaultValue);

	const [submitStatus, setSubmitStatus] = useState<boolean | string>('');

	useEffect(() => {
		if (submitStatus === true) {
			navigate('/profile');
		}
	}, [User, submitStatus]);

	async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
		if (Token !== null) {
			e.preventDefault();
			setSubmitStatus('loading');
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/update/password`, {
				method: 'PUT',
				body: JSON.stringify({ oldPassword: userPassword.oldPassword, newPassword: userPassword.newPassword }),
				headers: { 'Content-Type': 'application/json', Authorization: Token },
			});

			if (res.status === 200) {
				setSubmitStatus(true);
			} else {
				setSubmitStatus(false);
				setTimeout(() => {
					navigate('/');
				}, 4000);
			}
		} else {
			navigate('/login');
		}
	}

	if (User === null) {
		return null;
	} else {
		return (
			<div className='container w-25'>
				<div className='row my-4'>
					<div className='col'>
						<h4 className='text-center'>Change Password</h4>
					</div>
				</div>
				<form action='' className=''>
					<div className='row gy-3 mb-3'>
						<div className='col-12'>
							<label htmlFor='oldPassword'>Old password</label>
							<input
								type='password'
								className='form-control'
								name='oldPassword'
								value={userValue.oldPassword}
								onChange={(e) => {
									if (
										e.target.value.trim() === '' ||
										e.target.value.trim().length < 10 ||
										e.target.value.trim().length > 80
									) {
										e.target.className = 'form-control is-invalid';
									} else {
										e.target.className = 'form-control';
										setUserPassword({ ...userPassword, oldPassword: e.target.value.trim() });
									}
									setUserValue({ ...userValue, oldPassword: e.target.value.trim() });
								}}
							/>
							<div className='invalid-feedback'>Incorrect password</div>
						</div>
						<div className='col-12'>
							<label htmlFor='newPassword'>New password</label>
							<input
								type='password'
								className='form-control'
								name='newPassword'
								value={userValue.newPassword}
								onChange={(e) => {
									if (
										e.target.value.trim() === '' ||
										e.target.value.trim().length < 10 ||
										e.target.value.trim().length > 80 ||
										e.target.value.trim() === userValue.oldPassword
									) {
										e.target.className = 'form-control is-invalid';
									} else {
										e.target.className = 'form-control';
										setUserPassword({ ...userPassword, newPassword: e.target.value.trim() });
									}
									setUserValue({ ...userValue, newPassword: e.target.value.trim() });
								}}
							/>
							<div className='invalid-feedback'>Invalid password</div>
						</div>
						<div className='col-12'>
							<label htmlFor='confirmPassword'>Confirm password</label>
							<input
								type='password'
								className='form-control'
								name='confirmPassword'
								value={userValue.confirmPassword}
								onChange={(e) => {
									if (e.target.value.trim() !== userValue.newPassword) {
										e.target.className = 'form-control is-invalid';
									} else {
										e.target.className = 'form-control';
										setUserPassword({ ...userPassword, confirmPassword: e.target.value.trim() });
									}
									setUserValue({ ...userValue, confirmPassword: e.target.value.trim() });
								}}
							/>
							<div className='invalid-feedback'>Password do not match</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<button
								className='btn btn-primary'
								onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
									if (
										userPassword.newPassword === userPassword.confirmPassword &&
										userPassword.newPassword !== userValue.oldPassword &&
										userPassword.newPassword.trim() !== ''
									) {
										await handleSubmit(e);
									}
								}}
							>
								Change Password
							</button>
							{submitStatus === 'loading' ? (
								<span className='position-relative'>
									<span className='ms-3 position-absolute top-50 translate-middle badge rounded-pill text-primary'>
										<div
											className='spinner-grow spinner-sm'
											style={{ width: '1.25rem', height: '1.25rem' }}
											role='status'
										/>
									</span>
								</span>
							) : null}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

// ! Exports
export default UserPasswordUpdate;
