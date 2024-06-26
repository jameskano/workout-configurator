import { useMemo, useState } from 'react';
import { LoginContext } from './login-context';
import { LoginDataType } from './login-modal.types';

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	const setLoginDataHandler = (value?: LoginDataType) => {
		if (value) setLoginData(value);
		else setLoginData({ email: '', password: '' });
	};

	const value = useMemo(
		() => ({
			loginData,
			setLoginDataHandler,
		}),
		[loginData],
	);

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
