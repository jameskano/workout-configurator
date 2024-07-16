import { RequestHandler } from 'express';
import {
	deleteExerciseService,
	getExerciseService,
	getExercisesByIdsService,
	getFilteredExercisesService,
	updateExerciseService,
} from '../services/exercise-service';
import {
	createExerciseRepository,
	getAllExercisesRepository,
} from '../data-access/exercise-repository';

export const getAllExercises: RequestHandler = async (req, res, next) => {
	const { userId } = req.body;

	try {
		const exercises = await getAllExercisesRepository(userId);
		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};

export const getExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.params;

	try {
		const exercise = await getExerciseService(_id);

		res.status(200).json(exercise);
	} catch (error) {
		next(error);
	}
};

export const createExercise: RequestHandler = async (req, res, next) => {
	const { exerciseData, userId } = req.body;
	const data = { ...exerciseData, userId };

	try {
		const newExercise = await createExerciseRepository(data);
		res.status(201).json(newExercise);
	} catch (error) {
		next(error);
	}
};

export const deleteExercise: RequestHandler = async (req, res, next) => {
	const { exerciseIds } = req.body;

	try {
		await deleteExerciseService(exerciseIds);

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export const updateExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.body;

	try {
		const updatedExercise = await updateExerciseService(_id, req.body);

		res.status(200).json(updatedExercise);
	} catch (error) {
		next(error);
	}
};

export const getFilteredExercises: RequestHandler = async (req, res, next) => {
	const { textFilter, bodyPartFilter, userId } = req.body;

	try {
		const filteredExercises = await getFilteredExercisesService(
			textFilter,
			bodyPartFilter,
			userId,
		);

		res.status(200).json(filteredExercises);
	} catch (error) {
		next(error);
	}
};

export const getExercisesByIds: RequestHandler = async (req, res, next) => {
	const { exerciseIds }: { exerciseIds: string[] } = req.body;

	try {
		const exercises = await getExercisesByIdsService(exerciseIds);

		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};
