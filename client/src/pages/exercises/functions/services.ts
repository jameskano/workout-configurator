import { getAllExercises, getFilteredExercises } from '../../../services/exercises';

export const getAllExercisesFn = async () => {
	try {
		const response = await getAllExercises();

		if (response.statusText !== 'OK') throw new Error('Failed feching exercises');

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getFilteredExercisesFn = async (textFilter: string, bodyPartFilter: string) => {
	const response = await getFilteredExercises(textFilter, bodyPartFilter.toLowerCase());
	return response.data;
};
