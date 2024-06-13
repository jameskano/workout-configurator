import { useMemo, useState } from 'react';
import { ToastContext } from './toast-context';
import { ToastTypesType } from '../../../utils/types/toast.types';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<ToastTypesType>('');

	const value = useMemo(
		() => ({
			toastOpen,
			toastMessage,
			toastType,
			setToastOpen,
			setToastMessage,
			setToastType,
		}),
		[toastOpen, toastMessage, toastType],
	);

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
