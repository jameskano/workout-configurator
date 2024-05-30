import { createContext, useContext } from 'react';
import { ModalContextType } from './moda-context.types';

export const ModalContext = createContext({} as ModalContextType);

export const useModalContext = () => {
	const context = useContext(ModalContext);
	if (context === null) {
		throw new Error('useModalContext must be used within an ModalProvider');
	}
	return context;
};
