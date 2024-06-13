import { createContext, useContext } from 'react';
import { ToastTypesType } from '../../../utils/types/toast.types';

interface ToastContextType {
	toastOpen: boolean;
	toastMessage: string;
	toastType: ToastTypesType;
	setToastOpen: (value: boolean) => void;
	setToastMessage: (value: string) => void;
	setToastType: (value: ToastTypesType) => void;
}

export const ToastContext = createContext({} as ToastContextType);

export const useToastContext = () => {
	const context = useContext(ToastContext);
	if (context === null) {
		throw new Error('useToastContext must be used within an ToastProvider');
	}
	return context;
};
