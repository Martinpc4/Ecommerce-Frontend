// ! Imports
// * React Hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
// * React Components
// * Interfaces
import { AuthContextInterface, userDataInterface } from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function Signup(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const { setToken } = useContext<AuthContextInterface>(AuthContext);

	const [userData, setUserData] = useState<userDataInterface>({
		name: undefined,
		email: undefined,
		password: undefined,
		lastName: undefined,
		postalCode: undefined,
		city: undefined,
		street: undefined,
		streetNumber: undefined,
		country: undefined,
		state: undefined,
		phoneNumber: undefined,
		phoneExtension: undefined,
	});

	const [requestStatus, setRequestStatus] = useState<boolean | string>(true);

	function validateForm(): boolean {
		let isValid: boolean = true;
		if (
			userData.name === undefined ||
			userData.email === undefined ||
			userData.password === undefined ||
			userData.lastName === undefined ||
			userData.postalCode === undefined ||
			userData.city === undefined ||
			userData.street === undefined ||
			userData.streetNumber === undefined ||
			userData.country === undefined ||
			userData.state === undefined ||
			userData.phoneNumber === undefined ||
			userData.phoneExtension === undefined
		) {
			isValid = false;
		}
		return isValid;
	}

	async function handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>): Promise<void> {
		e.preventDefault();
		if (validateForm()) {
			setRequestStatus('loading');
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: { 'Content-Type': 'application/json' },
			});

			if (res.status === 200) {
				setRequestStatus(true);
				const authToken: string = (await res.json()).token;
				setToken(authToken);
				navigate('/');
			} else {
				setRequestStatus(false);
				setTimeout(() => {
					navigate('/');
				}, 4000);
			}
		}
	}

	return (
		<div className='container mx-5'>
			<div className='row m-4'>
				<h4 className='text-center'>User Signup</h4>
			</div>
			<div className='row'>
				<div className='col-12'>
					<form
						action={`${process.env.REACT_APP_BACKEND_URL}/auth/signup`}
						method='post'
						encType='multipart/form-data'
					>
						<div className='container'>
							<div className='row mb-5'>
								<div className='col-12'>
									<h5>Personal Information</h5>
								</div>
								<div className='col-12'>
									<div className='row'>
										<div className='my-3 col-6'>
											<label htmlFor='name'>Name</label>
											<input
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.trim().length > 25 ||
														e.target.value.trim().length < 2
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({ ...userData, name: undefined });
													} else {
														e.target.className = 'form-control';
														setUserData({ ...userData, name: e.target.value.trim() });
													}
												}}
												className='form-control'
												type='name'
												name='name'
											/>
											<div className='invalid-feedback'>Invalid Name</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='lastName'>Last Name</label>
											<input
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.trim().length > 50 ||
														e.target.value.trim().length < 2
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({ ...userData, lastName: undefined });
													} else {
														e.target.className = 'form-control';
														setUserData({ ...userData, lastName: e.target.value.trim() });
													}
												}}
												className='form-control'
												type='lastName'
												name='lastName'
											/>
											<div className='invalid-feedback'>Invalid Last Name</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='email'>Email</label>
											<input
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.trim().length > 100 ||
														e.target.value.trim().length < 5 ||
														e.target.value.search('@') === -1
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({ ...userData, email: undefined });
													} else {
														e.target.className = 'form-control';
														setUserData({ ...userData, email: e.target.value.trim() });
													}
												}}
												className='form-control'
												type='email'
												name='username'
											/>
											<div className='invalid-feedback'>Invalid Email Address</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='password'>Password</label>
											<input
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.trim().length < 10 ||
														e.target.value.trim().length > 80
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({ ...userData, password: undefined });
													} else {
														e.target.className = 'form-control';
														setUserData({ ...userData, password: e.target.value.trim() });
													}
												}}
												className='form-control'
												type='password'
												name='password'
											/>
											<div className='invalid-feedback'>Unsafe or Invalid Password</div>
										</div>
										<div className='my-3 col-6'>
											<div className='row mb-2'>
												<label htmlFor='phone'>Phone Number</label>
											</div>
											<div className='row'>
												<div className='col-4'>
													<div className='input-group'>
														<span className='input-group-text'>+</span>
														<input
															onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
																if (
																	e.target.value.trim() === '' ||
																	isNaN(Number(e.target.value)) ||
																	e.target.value.length > 4 ||
																	Number(e.target.value) <= 0
																) {
																	e.target.className = 'form-control is-invalid';
																	setUserData({
																		...userData,
																		phoneExtension: undefined,
																	});
																} else {
																	e.target.className = 'form-control';
																	setUserData({
																		...userData,
																		phoneExtension: Number(e.target.value),
																	});
																}
															}}
															className='form-control'
															type='text'
															name='phoneExtension'
														/>
														<div className='invalid-feedback'>Invalid Phone Extension</div>
													</div>
												</div>
												<div className='col-8'>
													<input
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
															if (
																e.target.value.trim() === '' ||
																isNaN(Number(e.target.value)) ||
																Number(e.target.value) < 0 ||
																e.target.value.length > 20
															) {
																e.target.className = 'form-control is-invalid';
																setUserData({
																	...userData,
																	phoneNumber: undefined,
																});
															} else {
																e.target.className = 'form-control';
																setUserData({
																	...userData,
																	phoneNumber: Number(e.target.value),
																});
															}
														}}
														className='form-control'
														type='text'
														name='phoneNumber'
													/>
													<div className='invalid-feedback'>Invalid Phone Number</div>
												</div>
											</div>
										</div>
										<div className='col-6 my-3'>
											<label htmlFor='avatarPhoto' className='form-label'>
												Photo
											</label>
											<input className='form-control' type='file' name='avatarPhoto' />
										</div>
									</div>
								</div>
							</div>
							<div className='row mb-5'>
								<div className='col-12'>
									<h5>Address Information</h5>
								</div>
								<div className='col-12'>
									<div className='row'>
										<div className='my-3 col-8'>
											<label htmlFor='street'>Street</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.length <= 0 ||
														e.target.value.length > 100
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															street: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															street: e.target.value,
														});
													}
												}}
												className='form-control'
												type='text'
												name='street'
											/>
											<div className='invalid-feedback'>Invalid Street</div>
										</div>
										<div className='my-3 col-4'>
											<label htmlFor='streetNumber'>Street Number</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														Number(e.target.value) === 0 ||
														isNaN(Number(e.target.value)) ||
														e.target.value.length > 20 ||
														e.target.value.length < 0
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															streetNumber: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															streetNumber: Number(e.target.value),
														});
													}
												}}
												className='form-control'
												type='text'
												name='streetNumber'
											/>
											<div className='invalid-feedback'>Invalid Street Number</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='postalCode'>Postal Code</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														Number(e.target.value) === 0 ||
														isNaN(Number(e.target.value)) ||
														e.target.value.length > 100 ||
														e.target.value.length < 0
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															postalCode: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															postalCode: Number(e.target.value),
														});
													}
												}}
												className='form-control'
												type='text'
												name='postalCode'
											/>
											<div className='invalid-feedback'>Invalid Postal Code</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='city'>City</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.length === 0 ||
														e.target.value.length > 100
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															city: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															city: e.target.value,
														});
													}
												}}
												className='form-control'
												type='text'
												name='city'
											/>
											<div className='invalid-feedback'>Invalid City</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='state'>State/Province</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.length <= 0 ||
														e.target.value.length > 100
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															state: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															state: e.target.value,
														});
													}
												}}
												className='form-control'
												type='text'
												name='state'
											/>
											<div className='invalid-feedback'>Invalid State</div>
										</div>
										<div className='my-3 col-6'>
											<label htmlFor='country'>Country</label>
											<input
												onChange={(e) => {
													if (
														e.target.value.trim() === '' ||
														e.target.value.length <= 0 ||
														e.target.value.length > 100
													) {
														e.target.className = 'form-control is-invalid';
														setUserData({
															...userData,
															country: undefined,
														});
													} else {
														e.target.className = 'form-control';
														setUserData({
															...userData,
															country: e.target.value,
														});
													}
												}}
												className='form-control'
												type='text'
												name='country'
											/>
											<div className='invalid-feedback'>Invalid Country</div>
										</div>
									</div>
								</div>
							</div>
							{requestStatus === false ? (
								<div className='row'>
									<div className='alert alert-danger' role='alert'>
										An error has occurred while trying to register your account.
									</div>
								</div>
							) : null}
							{requestStatus === 'loading' ? (
								<div className='row'>
									<div className='col'>
										<div className='text-center'>
											<div className='spinner-border spinner-border' role='status' />
										</div>
									</div>
								</div>
							) : null}
							<div className='row'>
								<div className='col-1'>
									<input
										onClick={async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
											await handleSubmit(e);
										}}
										className='btn btn-success'
										type='submit'
										value='Signup'
									/>
								</div>
								<div className='col-1'>
									<input
										onClick={() => {
											navigate('/login');
										}}
										className='btn btn-success'
										type='button'
										value='Login'
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

// ! Exports
export default Signup;
