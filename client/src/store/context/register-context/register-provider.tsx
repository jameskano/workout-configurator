import { useMemo, useState } from 'react';
import { RegisterContext } from './register-context';
import { RegisterDataType } from './register-context.types';

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
	const [registerData, setRegisterData] = useState({
		username: '',
		email: '',
		password: '',
		checkPassword: '',
	});

	const setRegisterDataHandler = (value?: RegisterDataType) => {
		if (value) setRegisterData(value);
		else setRegisterData({ username: '', email: '', password: '', checkPassword: '' });
	};

	const value = useMemo(
		() => ({
			registerData,
			setRegisterDataHandler,
		}),
		[registerData],
	);

	return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
};
