import { getAllExercises } from "../../../services/exercises";

export const getAllExercisesFn = async () => {
	try {
		const response = await getAllExercises();

		if (response.statusText !== "OK") throw new Error("Failed feching exercises");

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
