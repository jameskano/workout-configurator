import { getAllWorkouts, getFilteredWorkouts } from '../../../services/workouts';
import { useLoginContext } from '../../../store/context/login-context/login-context';

export const useWorkoutServices = () => {
	const { userId } = useLoginContext();

	const getAllWorkoutsFn = async () => {
		try {
			const response = await getAllWorkouts(userId);

			if (response.statusText !== 'OK') throw new Error('Failed feching workouts');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const getFilteredWorkoutsFn = async (debouncedFilter: string) => {
		try {
			const response = await getFilteredWorkouts(debouncedFilter, userId);

			if (response.statusText !== 'OK') throw new Error('Failed feching workouts');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return { getAllWorkoutsFn, getFilteredWorkoutsFn };
};
