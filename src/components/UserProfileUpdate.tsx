// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import UserContext from './contexts/User';
import AuthContext from './contexts/Auth';
// * DTOs
import { UserDTO } from '../DTOs/user.dto';
// * Interfaces
import { AuthContextInterface, UserContextInterface } from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function Signup(): JSX.Element | null {
	const navigate: NavigateFunction = useNavigate();

	const { User, setUserRefresh } = useContext<UserContextInterface>(UserContext);
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	const [userData, setUserData] = useState<UserDTO | null>(User);
	const [userValues, setUserValues] = useState<any | null>(User);

	const [submitStatus, setSubmitStatus] = useState<boolean | string>('');

	useEffect(() => {
		if (submitStatus === true) {
			navigate('/profile');
			setUserRefresh(true);
		}
	}, [User, submitStatus]);

	async function handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>): Promise<void> {
		if (Token !== null) {
			e.preventDefault();
			setSubmitStatus('loading');
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/update/profile`, {
				method: 'PUT',
				body: JSON.stringify(userData),
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

	if (User === null || userData === null || userValues === null) {
		return null;
	} else {
		return (
			<div className='container m-5'>
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
															e.target.value.trim().length > 25
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({ ...User, name: e.target.value.trim() });
														}
														setUserValues({ ...User, name: e.target.value.trim() });
													}}
													value={userValues.name}
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
															e.target.value.trim().length > 50
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																lastName: e.target.value.trim(),
															});
														}
														setUserValues({
															...userValues,
															lastName: e.target.value.trim(),
														});
													}}
													value={userValues.lastName}
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
															e.target.value.trim().length > 100
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																email: {
																	...userData.email,
																	email: e.target.value.trim(),
																},
															});
														}
														setUserValues({
															...userValues,
															email: {
																...userValues.email,
																email: e.target.value.trim(),
															},
														});
													}}
													value={userValues.email.email}
													className='form-control'
													type='email'
													name='username'
												/>
												<div className='invalid-feedback'>Invalid Email Address</div>
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
																	} else {
																		e.target.className = 'form-control';
																		setUserData({
																			...userData,
																			phoneNumber: {
																				...userData.phoneNumber,
																				extension: Number(e.target.value),
																			},
																		});
																	}
																	setUserValues({
																		...userValues,
																		phoneNumber: {
																			...userValues.phoneNumber,
																			extension: e.target.value.trim(),
																		},
																	});
																}}
																value={userValues.phoneNumber.extension}
																className='form-control'
																type='text'
																name='phoneExtension'
															/>
															<div className='invalid-feedback'>
																Invalid Phone Extension
															</div>
														</div>
													</div>
													<div className='col-8'>
														<input
															onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
																if (
																	e.target.value.trim() === '' ||
																	isNaN(Number(e.target.value)) ||
																	Number(e.target.value) <= 0 ||
																	e.target.value.length > 20
																) {
																	e.target.className = 'form-control is-invalid';
																} else {
																	e.target.className = 'form-control';
																	setUserValues({
																		...userData,
																		phoneNumber: {
																			...userData.phoneNumber,
																			number: Number(e.target.value),
																		},
																	});
																}
																setUserValues({
																	...userValues,
																	phoneNumber: {
																		...userValues.phoneNumber,
																		number: e.target.value.trim(),
																	},
																});
															}}
															value={userValues.phoneNumber.number}
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
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	street: e.target.value.trim(),
																},
															});
														}
														setUserData({
															...userValues,
															address: {
																...userValues.address,
																street: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.street}
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
															Number(e.target.value.trim()) === 0 ||
															isNaN(Number(e.target.value.trim())) ||
															e.target.value.trim().length > 20 ||
															e.target.value.trim().length <= 0
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	streetNumber: Number(e.target.value.trim()),
																},
															});
														}
														setUserValues({
															...userValues,
															address: {
																...userValues.address,
																streetNumber: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.streetNumber}
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
															Number(e.target.value.trim()) === 0 ||
															isNaN(Number(e.target.value.trim())) ||
															e.target.value.trim().length > 100 ||
															e.target.value.trim().length < 0
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	postalCode: Number(e.target.value),
																},
															});
														}
														setUserValues({
															...userValues,
															address: {
																...userValues.address,
																postalCode: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.postalCode}
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
															e.target.value.trim().length === 0 ||
															e.target.value.trim().length > 100
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	city: e.target.value.trim(),
																},
															});
														}
														setUserValues({
															...userValues,
															address: {
																...userValues.address,
																city: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.city}
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
															e.target.value.trim().length <= 0 ||
															e.target.value.trim().length > 100
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	state: e.target.value.trim(),
																},
															});
														}
														setUserValues({
															...userValues,
															address: {
																...userValues.address,
																state: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.state}
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
															e.target.value.trim().length <= 0 ||
															e.target.value.trim().length > 100
														) {
															e.target.className = 'form-control is-invalid';
														} else {
															e.target.className = 'form-control';
															setUserData({
																...userData,
																address: {
																	...userData.address,
																	country: e.target.value.trim(),
																},
															});
														}
														setUserValues({
															...userValues,
															address: {
																...userValues.address,
																country: e.target.value.trim(),
															},
														});
													}}
													value={userValues.address.country}
													className='form-control'
													type='text'
													name='country'
												/>
												<div className='invalid-feedback'>Invalid Country</div>
											</div>
										</div>
									</div>
								</div>
								{submitStatus === false ? (
									<div className='row'>
										<div className='alert alert-danger' role='alert'>
											There was an error in the user's registration
										</div>
									</div>
								) : null}
								<div className='row'>
									<div className='col-1'>
										<input
											onClick={async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
												await handleSubmit(e);
											}}
											className='btn btn-primary'
											type='submit'
											value='Update Profile'
										/>
									</div>
									<div className='col-1'>
										{submitStatus === 'loading' ? (
											<span className='ms-5 position-relative my-1 badge rounded-pill text-primary'>
												<div
													className='spinner-grow spinner-sm'
													style={{ width: '1.25rem', height: '1.25rem' }}
													role='status'
												/>
											</span>
										) : null}
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

// ! Exports
export default Signup;
