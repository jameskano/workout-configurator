import axios from "axios";
import { ExerciseType } from "utils/types/exercise.types";

export const getAllExercises = () => {
	const config = {
		method: "GET",
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
	};

	return axios(config);
};

export const getExercise = (id: number) => {
	const config = {
		method: "GET",
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise/${id}`,
	};

	return axios(config);
};

export const createExercise = (exerciseData: ExerciseType) => {
	const config = {
		method: "POST",
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: exerciseData,
	};

	return axios(config);
};

export const updateExercise = (exerciseData: ExerciseType) => {
	const config = {
		method: "PUT",
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: exerciseData,
	};

	return axios(config);
};

export const deleteExercise = (exerciseIds: string[]) => {
	const config = {
		method: "DELETE",
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: { exerciseIds },
	};

	return axios(config);
};
