import { checkTokenValidity } from '../../../services/users';
import { useLoginContext } from '../../../store/context/login-context/login-context';

export const useAuth = () => {
	const { setToken, setUserId } = useLoginContext();

	const saveAuthData = (token: string, userId: string) => {
		localStorage.setItem('wcToken', JSON.stringify(token));
		localStorage.setItem('wcUserId', JSON.stringify(userId));
		setToken(token);
		setUserId(userId);
	};

	const removeAuthData = () => {
		localStorage.removeItem('wcToken');
		localStorage.removeItem('wcUserId');
		setToken('');
		setUserId('');
		window.history.pushState('', '', '/');
	};

	return { saveAuthData, removeAuthData };
};
