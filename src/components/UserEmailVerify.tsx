// ! Imports
// * React Hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import UserContext from './contexts/User';
import AuthContext from './contexts/Auth';
// * Interfaces
import { AuthContextInterface, UserContextInterface } from '../interfaces/components.interface';
import {NavigateFunction} from 'react-router-dom';

// ! Component Definition
function UserProfileVerify(): JSX.Element {
	const { setUserRefresh } = useContext<UserContextInterface>(UserContext);
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	const navigate: NavigateFunction = useNavigate();

	const [verificationCode, setVerificationCode] = useState<string>('');
	const [verificationValue, setVerificationValue] = useState<string>('');
	const [submitStatus, setSubmitStatus] = useState<boolean | string>(false);

	async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
		if (Token !== null) {
			e.preventDefault();
			setSubmitStatus('loading');
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/verify`, {
				method: 'POST',
				body: JSON.stringify({ verificationCode }),
				headers: { 'Content-Type': 'application/json', authorization: Token },
			});
			if (res.status === 200) {
				setSubmitStatus(true);
				setUserRefresh(true);
				navigate('/profile');
			} else {
				setSubmitStatus('error');
				setTimeout(() => {
					setSubmitStatus(false);
				}, 4000);
			}
		}
	}

	return (
		<div className='container w-25'>
			<div className='row my-4'>
				<div className='col'>
					<h4 className='text-center'>Verify Email</h4>
				</div>
			</div>
			<form action='' className=''>
				<div className='row gy-3 mb-3'>
					<div className='col-12'>
						<label htmlFor='verificationCode'>Verification Code</label>
						<input
							type='text'
							className='form-control'
							name='oldPassword'
							value={verificationValue}
							onChange={(e) => {
								if (e.target.value.trim() === '' || submitStatus === 'error') {
									e.target.className = 'form-control is-invalid';
								} else {
									e.target.className = 'form-control';
									setVerificationCode(e.target.value.trim());
								}
								setVerificationValue(e.target.value.trim());
							}}
						/>
						<div className='invalid-feedback'>Incorrect verification code</div>
					</div>
				</div>
				<div className='row mb-2'>
					<div className='col-5'>
						<button
							className='btn btn-primary'
							onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
								if (verificationCode !== '') {
									await handleSubmit(e);
								}
							}}
						>
							Verify Email
						</button>
					</div>
					<div className='col-5'>
						<button
							className='btn btn-primary'
							onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
								e.preventDefault();
								if (Token !== null) {
									setSubmitStatus('loading');
									const res: Response = await fetch(
										`${process.env.REACT_APP_BACKEND_URL}/api/users/verification_code`,
										{
											method: 'POST',
											headers: { 'Content-Type': 'application/json', authorization: Token },
										}
									);
									if (res.status === 200) {
										setSubmitStatus(true);
									} else {
										setSubmitStatus('verification_code_not_sent');
									}
								}
							}}
						>
							Send Code
						</button>
					</div>
					{submitStatus === 'loading' ? (
						<div className='col-2 d-flex justify-items-center align-items-center'>
							<div className='clearfix'>
								<div
									className='spinner-grow spinner-sm text-primary'
									style={{ width: '1.25rem', height: '1.25rem', top: '26%', right: '62%' }}
									role='status'
								/>
							</div>
						</div>
					) : null}
				</div>
			</form>
			{submitStatus === 'error' ? (
				<div className='row'>
					<div className='alert alert-danger' role='alert'>
						There was an error in the user's registration
					</div>
				</div>
			) : null}
			{submitStatus === 'verification_code_not_sent' ? (
				<div className='row'>
					<div className='alert alert-danger' role='alert'>
						An error has occurred when sending the verification code, please try again later.
					</div>
				</div>
			) : null}
		</div>
	);
}

// ! Exports
export default UserProfileVerify;
