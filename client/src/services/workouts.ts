import { axiosInstance } from '../utils/functions/axios-setup';
import { WorkoutType } from 'utils/types/workout.types';

export const getAllWorkouts = (userId: string) => {
	const config = {
		method: 'GET',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: { userId },
	};

	return axiosInstance(config);
};

export const createWorkout = (workoutData: WorkoutType) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: workoutData,
	};

	return axiosInstance(config);
};

export const updateWorkout = (workoutData: WorkoutType) => {
	const config = {
		method: 'PUT',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: workoutData,
	};

	return axiosInstance(config);
};

export const deleteWorkouts = (workoutIds: string[]) => {
	const config = {
		method: 'DELETE',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: { workoutIds },
	};

	return axiosInstance(config);
};

export const getFilteredWorkouts = (filter: string, userId: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout/filter`,
		data: { filter, userId },
	};

	return axiosInstance(config);
};
