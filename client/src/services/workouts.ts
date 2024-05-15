import axios from 'axios';
import { WorkoutType } from 'utils/types/workout.types';

export const getAllWorkouts = () => {
	const config = {
		method: 'GET',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
	};

	return axios(config);
};

export const createWorkout = (workoutData: WorkoutType) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: workoutData,
	};

	return axios(config);
};

export const updateWorkout = (workoutData: WorkoutType) => {
	const config = {
		method: 'PUT',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: workoutData,
	};

	return axios(config);
};

export const deleteWorkouts = (workoutIds: string[]) => {
	const config = {
		method: 'DELETE',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout`,
		data: { workoutIds },
	};

	return axios(config);
};

export const getFilteredWorkouts = (filter: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/workout/filter`,
		params: { filter },
	};

	return axios(config);
};
