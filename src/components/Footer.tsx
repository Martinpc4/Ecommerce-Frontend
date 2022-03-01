// ! Imports
// * React Hooks
import { useState } from 'react';
// * React Components
import { Link } from 'react-router-dom';
// * Utils
import { validEmail } from '../utils/regex.util';

// ! Component Definition
function Footer(): JSX.Element {
	const [email, setEmail] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	return (
		<footer className='border-top py-4 bg-gray'>
			<div className='container'>
				<div className='row justify-content-between align-items-start'>
					<div className='col-md-2'>
						<div className='row'>
							<div className='col-12'>
								<p className='m-0 fs-5'>Contact</p>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<div className='row'>
									<div className='col-1'>
										<i className='bi bi-instagram'></i>
									</div>
									<div className='col'>
										<p className='m-0'>Instagram</p>
									</div>
								</div>
								<div className='row'>
									<div className='col-1'>
										<i className='bi bi-telephone'></i>
									</div>
									<div className='col'>
										<p className='m-0'>Phone</p>
									</div>
								</div>
								<div className='row'>
									<div className='col-1'>
										<i className='bi bi-envelope'></i>
									</div>
									<div className='col'>
										<p className='m-0'>Email</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='row mb-2'>
							<p className='m-0 fs-5 text-center'>Newsletter</p>
						</div>
						<form
							action={`${process.env.REACT_APP_BACKEND_URL}/api/newsletter/subscribe`}
							className='row gx-2 align-items-center'
						>
							<div className='col-9'>
								<input
									className='form-control'
									type='text'
									id='newsletter-email'
									placeholder='email'
									value={emailValue}
									onChange={(e) => {
										if (validEmail.test(e.target.value)) {
											setEmail(e.target.value);
										} else {
											setEmail('');
										}
										setEmailValue(e.target.value);
									}}
								/>
							</div>
							<div className='col-3'>
								<input
									className='btn btn-primary'
									type='submit'
									value='Submit'
									onClick={(e) => {
										e.preventDefault();
										if (email.length > 0) {
											console.log('SENT');
											fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter/subscribe`, {
												method: 'POST',
												headers: {
													'Content-Type': 'application/json',
												},
												body: JSON.stringify({
													email,
												}),
											});
										}
									}}
								/>
							</div>
						</form>
					</div>
					<div className='col-md-2'>
						<div className='row'>
							<div className='col-12'>
								<p className='m-0 fs-5 text-start'>Sections</p>
							</div>
						</div>
						<div className='row ps-2'>
							<Link to='/' className='col-12 text-decoration-none'>
								<p className='m-0 fs-6 text-start text-dark'>Home</p>
							</Link>
							<Link to='/Shop/1' className='col-12 text-decoration-none'>
								<p className='m-0 fs-6 text-start text-dark'>Mac</p>
							</Link>
							<Link to='/Shop/2' className='col-12 text-decoration-none'>
								<p className='m-0 fs-6 text-start text-dark'>iPad</p>
							</Link>
							<Link to='/Shop/3' className='col-12 text-decoration-none'>
								<p className='m-0 fs-6 text-start text-dark'>iPhone</p>
							</Link>
							<Link to='/Shop/4' className='col-12 text-decoration-none'>
								<p className='m-0 fs-6 text-start text-dark'>Accesories</p>
							</Link>
						</div>
					</div>
				</div>
				<div className='row'>
					<a href='https://www.linkedin.com/in/martin-perez-cobo/' className='text-decoration-none'>
						<p className='m-0 text-muted text-center'>
							<span>
								<i className='bi bi-linkedin me-1 text-muted' />
							</span>
							Developer: Martín Pérez Cobo
						</p>
					</a>
				</div>
			</div>
		</footer>
	);
};

// ! Exports
export default Footer;
