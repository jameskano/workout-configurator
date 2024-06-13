import useToast from '../../utils/hooks/toast-hook/use-toast';
import { useToastContext } from '../../store/context/toast-context/toast-context';
import { toastConstants } from '../../utils/constants/toast';
import Snackbar from '@mui/material/Snackbar';

const Toast = () => {
	const { toastOpen, toastMessage, toastType } = useToastContext();
	const { closeToastHandler } = useToast();

	return (
		<Snackbar
			open={toastOpen}
			message={toastMessage}
			autoHideDuration={toastConstants.DELAY}
			onClose={closeToastHandler}
			TransitionComponent={toastConstants.TRANSITION}
			anchorOrigin={{
				vertical: toastConstants.POSITION.VERTICAL,
				horizontal: toastConstants.POSITION.HORIZONTAL,
			}}
			ContentProps={{
				sx: {
					backgroundColor: toastType,
					borderRadius: '7px',
					justifyContent: 'center',
				},
			}}
		/>
	);
};

export default Toast;
