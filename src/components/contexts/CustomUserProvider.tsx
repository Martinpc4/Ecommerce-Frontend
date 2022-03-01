// ! Imports
// * React Hooks
import { useContext, useEffect, useState } from 'react';
// * React Contexts
import UserContext from './User';
import AuthContext from './Auth';
// * Controllers
import UsersController from '../../controllers/user.controller';
// * DTOs
import { UserDTO } from '../../DTOs/user.dto';
// * Interfaces
import { AuthContextInterface } from '../../interfaces/components.interface';

// ! Provider Definition
function UserProvider({ children }: any): JSX.Element {
	const { Token } = useContext<AuthContextInterface>(AuthContext);

	const [User, setUser] = useState<UserDTO | null>(null);
	const [userRefresh, setUserRefresh] = useState<boolean>(false);

	async function fetchUser(token: string): Promise<void> {
		setUser(await UsersController.getProfile(token));
	}

	useEffect(() => {
		(async () => {
			if (Token !== null) {
				await fetchUser(Token);
			}
		})();
	}, [Token, userRefresh]);

	return (
		<UserContext.Provider
			value={{
				User,
				setUserRefresh,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

// ! Exports
export default UserProvider;
