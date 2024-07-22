import { axiosInstance } from '../utils/functions/axios-setup';
import { ExerciseType } from 'utils/types/exercise.types';

export const getAllExercises = (userId: string) => {
	const config = {
		method: 'GET',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		params: { userId },
	};

	return axiosInstance(config);
};

export const getExercise = (id: number) => {
	const config = {
		method: 'GET',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise/${id}`,
	};

	return axiosInstance(config);
};

export const createExercise = (exerciseData: ExerciseType, userId: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: { exerciseData, userId },
	};

	return axiosInstance(config);
};

export const updateExercise = (exerciseData: ExerciseType) => {
	const config = {
		method: 'PUT',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: exerciseData,
	};

	return axiosInstance(config);
};

export const deleteExercise = (exerciseIds: string[]) => {
	const config = {
		method: 'DELETE',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise`,
		data: { exerciseIds },
	};

	return axiosInstance(config);
};

export const getFilteredExercises = (
	textFilter: string,
	bodyPartFilter: string,
	userId: string,
) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise/filter`,
		data: { textFilter, bodyPartFilter, userId },
	};

	return axiosInstance(config);
};

export const getExercisesByIds = (exerciseIds: string[]) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/exercise/ids`,
		data: { exerciseIds },
	};
	return axiosInstance(config);
};
