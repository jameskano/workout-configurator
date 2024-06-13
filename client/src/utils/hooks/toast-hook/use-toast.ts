import { ToastTypesType } from '../../../utils/types/toast.types';
import { useToastContext } from '../../../store/context/toast-context/toast-context';

const useToast = () => {
	const { setToastOpen, setToastMessage, setToastType } = useToastContext();

	const openToastHandler = (message: string, type: ToastTypesType) => {
		if (message) {
			setToastMessage(message);
			setToastType(type);
			setToastOpen(true);
		}
	};

	const closeToastHandler = () => {
		setToastMessage('');
		setToastType('');
		setToastOpen(false);
	};

	return { openToastHandler, closeToastHandler };
};

export default useToast;
