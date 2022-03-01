// ! Imports
// * React Hooks
import { useContext } from 'react';
// * React Contexts
import AuthContext from './contexts/Auth';
// * React Components
import { Navigate, Outlet } from 'react-router-dom';
// * Interfaces
import { AuthContextInterface } from '../interfaces/components.interface';

// ! Component Definition
function ProtectedRoutes(): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	if (Token !== null) {
		return <Outlet />;
	} else {
		return <Navigate to={'/login'} />;
	}
}

// ! Exports
export default ProtectedRoutes;
