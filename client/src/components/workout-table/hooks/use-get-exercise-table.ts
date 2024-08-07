import { getExercisesByIds } from '../../../services/exercises';

const useGetExerciseTable = () => {
	const getExercisesByIdsFn = async (exercises: string[]) => {
		try {
			const response = await getExercisesByIds(exercises);

			if (response.status !== 200) throw new Error('Failed feching exercises');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return { getExercisesByIdsFn };
};

export default useGetExerciseTable;
