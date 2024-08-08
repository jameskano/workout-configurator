import { useLoginContext } from '../../../store/context/login-context/login-context';
import { getAllExercises, getFilteredExercises } from '../../../services/exercises';

export const useExerciseServices = () => {
	const { userId } = useLoginContext();

	const getAllExercisesFn = async () => {
		try {
			const response = await getAllExercises(userId);

			if (response.status !== 200) throw new Error('Failed feching exercises');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const getFilteredExercisesFn = async (textFilter: string, bodyPartFilter: string) => {
		try {
			const response = await getFilteredExercises(
				textFilter,
				bodyPartFilter.toLowerCase(),
				userId,
			);

			if (response.status !== 200) throw new Error('Failed feching exercises');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return { getAllExercisesFn, getFilteredExercisesFn };
};
