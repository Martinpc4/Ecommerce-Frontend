// ! Imports
// * DTOs
import { UserDTO } from '../DTOs/user.dto';

// ! Controller Definition
class UsersControllerClass {
	async getProfile(Token: string): Promise<UserDTO> {
		try {
			const res: Response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
				method: 'GET',
				headers: { Authorization: Token },
			});
			if (res.status === 200) {
				return new UserDTO(await res.json());
			} else {
				throw new Error('Profile could not be recovered from server');
			}
		} catch (err: any) {
			throw new Error(err);
		}
	}
}

// ! Controller Instance
const UsersController: UsersControllerClass = new UsersControllerClass();

// ! Exports
export default UsersController;
