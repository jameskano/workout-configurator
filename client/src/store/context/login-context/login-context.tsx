import { createContext, useContext } from 'react';
import { LoginModalContextType } from './login-modal.types';

export const LoginContext = createContext({} as LoginModalContextType);

export const useLoginContext = () => {
	const context = useContext(LoginContext);
	if (context === null) {
		throw new Error('useLoginContext must be used within an LoginProvider');
	}
	return context;
};
