import { getAllWorkouts } from "../../../services/workouts";

export const getAllWorkoutsFn = async () => {
	try {
		const response = await getAllWorkouts();

		if (response.statusText !== "OK") throw new Error("Failed feching workouts");

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
