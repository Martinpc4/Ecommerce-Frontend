// ! Imports
// * React Hooks
import { useContext } from 'react';
// * React Contexts
import AuthContext from './contexts/Auth';
// * React Components
import CartWidget from './CartWidget';
import UserWidget from './UserWidget';
import { Link, NavLink } from 'react-router-dom';
// * Interfaces
import { AuthContextInterface } from '../interfaces/components.interface';

// ! Component Definition
function NavBar(): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	return (
		<header className='border-bottom py-3 bg-light' style={{ height: '4rem' }}>
			<div className='container'>
				<div className='row align-items-center justify-content-between'>
					<div className='col-2'>
						<Link to={`/`}>
							<img src='/assets/brand/Logo.svg' className='w-75' alt='' />
						</Link>
					</div>
					<div className='col'>
						<div className='row d-flex flex-row'>
							<div className='col'>
								<NavLink
									to='/'
									className={({ isActive }) =>
										isActive ? 'hdr-active-item text-decoration-none' : 'text-decoration-none'
									}
								>
									<p className='m-0 fs-5 text-center text-dark'>Home</p>
								</NavLink>
							</div>
							<div className='col'>
								<NavLink
									to='/Shop/1'
									className={({ isActive }) =>
										isActive ? 'hdr-active-item text-decoration-none' : 'text-decoration-none'
									}
								>
									<p className='m-0 fs-5 text-center text-dark'>Mac</p>
								</NavLink>
							</div>
							<div className='col'>
								<NavLink
									to='/Shop/2'
									className={({ isActive }) =>
										isActive ? 'hdr-active-item text-decoration-none' : 'text-decoration-none'
									}
								>
									<p className='m-0 fs-5 text-center text-dark'>IPad</p>
								</NavLink>
							</div>
							<div className='col'>
								<NavLink
									to='/Shop/3'
									className={({ isActive }) =>
										isActive ? 'hdr-active-item text-decoration-none' : 'text-decoration-none'
									}
								>
									<p className='m-0 fs-5 text-center text-dark'>IPhone</p>
								</NavLink>
							</div>
							<div className='col'>
								<NavLink
									to='/Shop/4'
									className={({ isActive }) =>
										isActive ? 'hdr-active-item text-decoration-none' : 'text-decoration-none'
									}
								>
									<p className='m-0 fs-5 text-center text-dark'>Accesories</p>
								</NavLink>
							</div>
						</div>
					</div>
					<div className='col-2'>
						<div className='row d-flex justify-items-right justify-content-end'>
							{Token !== null ? (
								<div className='col-3 d-flex align-items-center justify-content-center'>
									<CartWidget />
								</div>
							) : null}
							<div className='col-3 d-flex align-items-center justify-content-center'>
								<UserWidget />
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

// ! Exports
export default NavBar;
