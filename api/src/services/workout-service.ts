import { CustomError } from '../utils/classes/errors';
import { checkIfElementExists, workoutIdValidation } from '../utils/functions/db-validations';
import {
	createWorkoutRepository,
	deleteManyRepository,
	getAllWorkoutsRepository,
	updateWorkoutRepository,
} from '../data-access/workout-repository';
import { validateWorkout } from '../utils/functions/data-validation';
import { WorkoutType } from '../utils/types/workout.types';
const diacriticLess = require('diacriticless');

export const deleteWorkoutsService = async (workoutIds: string[]) => {
	for (const _id of workoutIds) {
		workoutIdValidation(_id);
	}

	const deletedExercises = await deleteManyRepository(workoutIds);

	if (deletedExercises.deletedCount === 0) {
		throw new CustomError(400, 'No workouts were deleted');
	}
};

export const createWorkoutService = async (data: WorkoutType) => {
	validateWorkout(data.title, data.exercises);

	const newWorkout = await createWorkoutRepository(data);

	return newWorkout;
};

export const updateWorkoutService = async (_id: string, data: WorkoutType) => {
	validateWorkout(data.title, data.exercises);

	await workoutIdValidation(_id);

	const updatedWorkout = await updateWorkoutRepository(_id, data);

	await checkIfElementExists(updatedWorkout);

	return updatedWorkout;
};

export const getFilteredWorkoutsService = async (filter: string, userId: string) => {
	const formattedFilter = diacriticLess(filter.toLowerCase());
	const workouts = await getAllWorkoutsRepository(userId);
	const filteredWorkouts = workouts.filter((workout) => {
		const titleWithoutDiacritics = diacriticLess(workout.title.toLowerCase());
		return titleWithoutDiacritics.includes(formattedFilter);
	});

	return filteredWorkouts;
};
