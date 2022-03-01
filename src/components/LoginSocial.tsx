// ! Imports
// * React Hooks
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// * React Contexts
import AuthContext from './contexts/Auth';
// * Interfaces
import { NavigateFunction } from 'react-router-dom';

// ! Component Definition
function LoginSocial(): JSX.Element {
	const { Token } = useParams();
	const { setToken } = useContext(AuthContext);
	const navigate: NavigateFunction = useNavigate();

	if (Token !== undefined && Token !== null && Token.length > 0) {
		setToken(Token);
		setTimeout(() => {
			navigate('/');
		}, 500);
	}

	return <></>;
}

// ! Exports
export default LoginSocial;
