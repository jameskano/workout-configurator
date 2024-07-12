import { CustomError } from '../utils/classes/errors';
import {
	deleteMany,
	getAllExercisesRepository,
	getExerciseByIdRepository,
	getExercisesByIdsRepository,
	updateExerciseRepository,
} from '../data-access/exercise-repository';
import {
	findByIdInArrayRepository,
	updateWorkoutRepository,
} from '../data-access/workout-repository';
import { checkIfElementExists, exerciseIdValidation } from '../utils/functions/db-validations';
import { ExerciseType } from '../models/exercise-model';
const diacriticLess = require('diacriticless');
import mongoose from 'mongoose';

export const deleteExerciseService = async (exerciseIds: string[]) => {
	for (const _id of exerciseIds) {
		await exerciseIdValidation(_id);
	}

	const deletedExercises = await deleteMany(exerciseIds);

	if (deletedExercises.deletedCount === 0) {
		throw new CustomError(400, 'No exercises were deleted');
	}

	const workouts = await findByIdInArrayRepository(exerciseIds);

	for (const workout of workouts) {
		// @ts-expect-error
		workout.exercises = workout.exercises.filter((id: string) => !exerciseIds.includes(id));
		await updateWorkoutRepository(workout.id, workout);
	}
};

export const getExerciseService = async (_id: string) => {
	await exerciseIdValidation(_id);

	const exercise = await getExerciseByIdRepository(_id);

	await checkIfElementExists(exercise);

	return exercise;
};

export const updateExerciseService = async (_id: string, data: ExerciseType) => {
	await exerciseIdValidation(_id);

	const updatedExercise = await updateExerciseRepository(_id, data);

	await checkIfElementExists(updatedExercise);

	return updatedExercise;
};

export const getFilteredExercisesService = async (
	textFilter: string,
	bodyPartFilter: string,
	userId: string,
) => {
	const formattedFilter = diacriticLess(textFilter.toLowerCase());
	const exercises = await getAllExercisesRepository(userId);
	const filteredExercises = exercises.filter((exercise) => {
		const titleWithoutDiacritics = diacriticLess(exercise.title.toLowerCase());
		switch (true) {
			case formattedFilter && bodyPartFilter !== '':
				return (
					titleWithoutDiacritics.includes(formattedFilter) &&
					exercise.bodyPart === bodyPartFilter
				);
			case formattedFilter && !bodyPartFilter:
				return titleWithoutDiacritics.includes(formattedFilter);
			case !formattedFilter && bodyPartFilter !== '':
				return exercise.bodyPart === bodyPartFilter;
			case !formattedFilter && !bodyPartFilter:
				return exercises;
		}
	});

	return filteredExercises;
};

export const getExercisesByIdsService = async (exerciseIds: string[]) => {
	const invalidIds = exerciseIds.filter((id) => !mongoose.isValidObjectId(id));
	if (invalidIds.length > 0) {
		throw new CustomError(400, 'Invalid exercise ID');
	}

	const exercises = await getExercisesByIdsRepository(exerciseIds);

	if (exercises.length !== exerciseIds.length) {
		throw new CustomError(400, 'No exercises found for the provided IDs');
	}

	return exercises;
};
