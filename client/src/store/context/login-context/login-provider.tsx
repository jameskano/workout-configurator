import { useEffect, useMemo, useState } from 'react';
import { LoginContext } from './login-context';
import { LoginDataType } from './login-modal.types';
import { checkTokenValidity } from '../../../services/users';

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [loadingTokenChecking, setLoadingTokenChecking] = useState(true);

	const removeAuthData = () => {
		localStorage.removeItem('wcToken');
		localStorage.removeItem('wcUserId');
		setToken('');
		setUserId('');
		window.history.pushState('', '', '/');
	};

	const checkIfTokenIsValid = async (
		token: string,
		user: string,
		setTokenFn: (value: string) => void,
		setUserIdFn: (value: string) => void,
	) => {
		try {
			const response = await checkTokenValidity();
			if (response.data.valid) {
				setTokenFn(token);
				setUserIdFn(user);
			} else throw new Error('Token is not valid');
		} catch (error) {
			removeAuthData();
		} finally {
			setLoadingTokenChecking(false);
		}
	};
	console.log(token);
	useEffect(() => {
		if (!loadingTokenChecking) return;

		const tokenString = localStorage.getItem('wcToken') || null;

		if (!tokenString) {
			localStorage.removeItem('wcUserId');
			setUserId('');
			setLoadingTokenChecking(false);
			window.history.pushState('', '', '/');
			return;
		}

		const accessToken = tokenString ? JSON.parse(tokenString) : tokenString;

		const userString = localStorage.getItem('wcUserId');
		const user = userString && JSON.parse(userString);

		checkIfTokenIsValid(accessToken, user, setToken, setUserId);
	}, [checkIfTokenIsValid]);

	const setLoginDataHandler = (value?: LoginDataType) => {
		if (value) setLoginData(value);
		else setLoginData({ email: '', password: '' });
	};

	const value = useMemo(
		() => ({
			loginData,
			setLoginDataHandler,
			token,
			setToken,
			userId,
			setUserId,
			loadingTokenChecking,
			setLoadingTokenChecking,
		}),
		[loginData, token, userId, loadingTokenChecking],
	);

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
