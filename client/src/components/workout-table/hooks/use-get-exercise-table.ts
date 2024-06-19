import { useWorkoutContext } from '../../../store/context/workout-context/workout-context';
import { getExercisesByIds } from '../../../services/exercises';

const useGetExerciseTable = () => {
	const getExercisesByIdsFn = async (exercises: string[]) => {
		try {
			const response = await getExercisesByIds(exercises);

			if (response.statusText !== 'OK') throw new Error('Failed feching exercises');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return { getExercisesByIdsFn };
};

export default useGetExerciseTable;
