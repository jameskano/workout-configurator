import { useCircularLoaderContext } from '../../../store/context/circular-loader-context/circular-loader-context';
import { deleteWorkouts } from '../../../services/workouts';
import { deleteExercise } from '../../../services/exercises';
import { useLocation } from 'react-router';
import useToast from '../toast-hook/use-toast';
import { toastMessages } from '../../../utils/constants/toast-messages';
import { toastConstants } from '../../../utils/constants/toast';
import { useModalContext } from '../../../store/context/modal-context/modal-context';

const useDelete = () => {
	const { setOpenLoader } = useCircularLoaderContext();
	const { deleteIds, triggerFunctions, setTriggerFunctions, setDeleteIds } = useModalContext();
	const { openToastHandler } = useToast();
	const { pathname } = useLocation();

	const getDeleteFn = () => {
		switch (pathname) {
			case '/workouts':
				return deleteWorkouts;
			case '/exercises':
				return deleteExercise;
		}
	};

	const getToastErrorMessage = () => {
		switch (pathname) {
			case '/workout':
				return toastMessages.WORKOUT_DELETE_ERROR;
			case '/exercises':
				return toastMessages.EXERCISE_DELETE_ERROR;
		}
	};

	const getToastSuccessMessage = () => {
		switch (pathname) {
			case '/workout':
				return toastMessages.WORKOUT_DELETE_SUCCESS;
			case '/exercises':
				return toastMessages.EXERCISE_DELETE_SUCCESS;
		}
	};

	const deleteRequest = async () => {
		const deleteFn = getDeleteFn();

		setOpenLoader(true);
		try {
			deleteFn && (await deleteFn(deleteIds));
			openToastHandler(getToastSuccessMessage()!, toastConstants.TYPES.SUCCESS);
			triggerFunctions?.onSuccess && triggerFunctions.onSuccess();
		} catch (error) {
			openToastHandler(getToastErrorMessage()!, toastConstants.TYPES.ERROR);
			triggerFunctions?.onError && triggerFunctions.onError();
		} finally {
			setTriggerFunctions({});
			setDeleteIds([]);
			setOpenLoader(false);
			triggerFunctions?.onFinish && triggerFunctions.onFinish();
		}
	};

	return { deleteRequest };
};

export default useDelete;
