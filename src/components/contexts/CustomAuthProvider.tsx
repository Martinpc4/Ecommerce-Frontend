// ! Imports
// * Modules
import React from 'react';
// * React Hooks
import { useState, useEffect } from 'react';
// * Context
import AuthContext from './Auth';

// ! Provider Definition
function AuthProvider({ children }: any): JSX.Element {
	const [Token, setToken] = useState<string | null>(() => {
		const localToken: string | null = localStorage.getItem('token');
		if (localToken === null) {
			return null;
		} else {
			return localToken;
		}
	});

	useEffect(() => {
		if (Token !== null) {
			localStorage.setItem('token', Token);
		}
	}, [Token]);

	return (
		<AuthContext.Provider
			value={{
				Token,
				setToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// ! Exports
export default AuthProvider;
