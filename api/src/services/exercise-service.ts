import mongoose from 'mongoose';
import { CustomError } from '../utils/classes/errors';
import { deleteMany } from '../data-access/exercise-repository';
import { findByIdInArray, updateWorkout } from '../data-access/workout-repository';
import { WorkoutType } from '../models/workout-model';

export const removeExercise = async (exerciseIds: string[]) => {
	for (const _id of exerciseIds) {
		if (!mongoose.isValidObjectId(_id)) {
			throw new CustomError(400, `Invalid exercise id: ${_id}`);
		}
	}

	const deletedExercises = await deleteMany(exerciseIds);

	if (deletedExercises.deletedCount === 0) {
		throw new CustomError(400, 'No exercises were deleted');
	}

	const workouts = await findByIdInArray(exerciseIds);

	for (const workout of workouts) {
		console.log(workout.exercises);
		// @ts-expect-error
		workout.exercises = workout.exercises.filter((id: string) => !exerciseIds.includes(id));
		console.log(workout.exercises);
		await updateWorkout(workout.id, workout);
	}
};
