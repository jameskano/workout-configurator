import { createContext, useContext } from 'react';
import { RegisterContextType } from './register-context.types';

export const RegisterContext = createContext({} as RegisterContextType);

export const useRegisterContext = () => {
	const context = useContext(RegisterContext);
	if (context === null) {
		throw new Error('useRegisterContext must be used within an RegisterProvider');
	}
	return context;
};
