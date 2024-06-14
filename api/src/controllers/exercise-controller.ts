import { RequestHandler } from 'express';
import ExerciseModel from '../models/exercise-model';
import mongoose from 'mongoose';
import { CustomError } from '../utils/classes/errors';
import { removeExercise } from '../services/exercise-service';
const diacriticLess = require('diacriticless');

export const getAllExercises: RequestHandler = async (req, res, next) => {
	try {
		const exercises = await ExerciseModel.find({}).sort({ createdAt: -1 });
		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};

export const getExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.params;

	try {
		if (!mongoose.isValidObjectId(_id)) throw new CustomError(400, 'Exercise id invalid');

		const exercise = await ExerciseModel.findById(_id);

		if (!exercise) throw new CustomError(400, 'Exercise does not exist');

		res.status(200).json(exercise);
	} catch (error) {
		next(error);
	}
};

export const createExercise: RequestHandler = async (req, res, next) => {
	try {
		const newExercise = await ExerciseModel.create(req.body);
		res.status(201).json(newExercise);
	} catch (error) {
		next(error);
	}
};

export const deleteExercise: RequestHandler = async (req, res, next) => {
	const { exerciseIds } = req.body;

	try {
		await removeExercise(exerciseIds);

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export const updateExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.body;

	try {
		if (!mongoose.isValidObjectId(_id))
			throw new CustomError(400, `Invalid exercise id: ${_id}`);

		const updatedExercise = await ExerciseModel.findByIdAndUpdate({ _id }, { ...req.body });

		if (!updatedExercise) throw new CustomError(400, 'Exercise does not exist');

		res.status(200).json(updatedExercise);
	} catch (error) {
		next(error);
	}
};

export const getFilteredExercises: RequestHandler = async (req, res, next) => {
	const { textFilter, bodyPartFilter } = req.body;

	try {
		const formattedFilter = diacriticLess(textFilter.toLowerCase());
		const exercises = await ExerciseModel.find({}).sort({
			createdAt: -1,
		});
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

		res.status(200).json(filteredExercises);
	} catch (error) {
		next(error);
	}
};

export const getExercisesByIds: RequestHandler = async (req, res, next) => {
	const { exerciseIds }: { exerciseIds: string[] } = req.body;

	try {
		const invalidIds = exerciseIds.filter((id) => !mongoose.isValidObjectId(id));
		if (invalidIds.length > 0) {
			throw new CustomError(400, 'Invalid exercise ID');
		}

		const exercises = await ExerciseModel.find({ _id: { $in: exerciseIds } });

		if (exercises.length !== exerciseIds.length) {
			throw new CustomError(400, 'No exercises found for the provided IDs');
		}

		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};
