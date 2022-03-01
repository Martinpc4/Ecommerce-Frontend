// ! Imports
// * React Hooks
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
import UserContext from './contexts/User';
// * Interfaces
import { AuthContextInterface, UserContextInterface } from '../interfaces/components.interface';
import { NavigateFunction } from 'react-router-dom';

// ! Component Defintion
function UserProfile(): JSX.Element | null {
	const { Token } = useContext<AuthContextInterface>(AuthContext);
	const { User } = useContext<UserContextInterface>(UserContext);
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		if (Token === null) {
			navigate('/login');
		}
	}, [Token, User]);

	if (User === null || Token === null) {
		return null;
	} else {
		return (
			<div className='container'>
				<div className='row my-4'>
					<h4 className='text-center'>
						User's Profile
						<i
							onClick={() => {
								navigate('/update/profile');
							}}
							style={{ fontSize: '1rem' }}
							className='ms-3 bi bi-pencil-square'
						></i>
					</h4>
				</div>
				<div className='row'>
					<div className='col-6'>
						<div className='row'>
							<div className='col-12'>
								<h5>Personal Information</h5>
							</div>
						</div>
						<div className='container'>
							<div className='row'>
								<div className='col-6'>
									<div className='row'>
										<div className='col'>
											<h6>Name</h6>
										</div>
									</div>
									<div className='row'>
										<div className='col'>
											<p>{User.name}</p>
										</div>
									</div>
								</div>
								<div className='col-6'>
									<div className='row'>
										<div className='col'>
											<h6>Last Name</h6>
										</div>
									</div>
									<div className='row'>
										<div className='col'>
											<p>{User.lastName}</p>
										</div>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-6'>
									<div className='row'>
										<div className='col'>
											<h6 className='d-flex flex-row justify-content-start align-items-center align-content-center'>
												Email{' '}
												{User.email.verified ? (
													<span className='d-flex flex-row justify-content-start align-items-center align-content-center badge rounded-pill text-success'>
														Verified
													</span>
												) : (
													<span className='d-flex flex-row justify-content-start align-items-center align-content-center badge rounded-pill text-danger'>
														Not Verified
													</span>
												)}
											</h6>
										</div>
									</div>
									<div className='row'>
										<div className='col'>
											<div className='div'>
												<p>{User.email.email}</p>
											</div>
										</div>
									</div>
								</div>
								{User.phoneNumber.extension !== undefined && User.phoneNumber.number !== undefined ? (
									<div className='col-6'>
										<div className='row'>
											<div className='col'>
												<h6>Phone Number</h6>
											</div>
										</div>
										<div className='row'>
											<div className='col'>
												<p>
													+{User.phoneNumber.extension} {User.phoneNumber.number}
												</p>
											</div>
										</div>
									</div>
								) : null}
							</div>
						</div>
						{User.address.street !== undefined &&
						User.address.city !== undefined &&
						User.address.state !== undefined &&
						User.address.postalCode !== undefined &&
						User.address.streetNumber !== undefined &&
						User.address.country !== undefined ? (
							<>
								<div className='row'>
									<div className='col'>
										<h5>Address Information</h5>
									</div>
								</div>
								<div className='container'>
									<div className='row'>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>Street</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.street}</p>
												</div>
											</div>
										</div>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>Street Number</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.streetNumber}</p>
												</div>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>Postal Code</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.postalCode}</p>
												</div>
											</div>
										</div>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>City</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.city}</p>
												</div>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>State</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.state}</p>
												</div>
											</div>
										</div>
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>Country</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<p>{User.address.country}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						) : null}
					</div>
					<div className='col-6'>
						<div className='row'>
							<div className='col-12'>
								<h5>Account Security</h5>
							</div>
							<div className='col-12'>
								<div className='row'>
									<div className='col-6'>
										<div className='row'>
											<div className='col'>
												<h6>Password</h6>
											</div>
										</div>
										<div className='row'>
											<div className='col'>
												<button
													className='btn btn-primary btn-sm'
													onClick={() => {
														navigate('/update/password');
													}}
												>
													Change Password
												</button>
											</div>
										</div>
									</div>
									{!User.email.verified ? (
										<div className='col-6'>
											<div className='row'>
												<div className='col'>
													<h6>Email Verification</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>
													<button
														className='btn btn-primary btn-sm'
														onClick={() => {
															navigate('/profile/verify');
														}}
													>
														Verify Email
													</button>
												</div>
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// ! Exports
export default UserProfile;
