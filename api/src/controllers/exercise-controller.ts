import { RequestHandler } from 'express';
import ExerciseModel from '../models/exercise-model';
import mongoose from 'mongoose';
import { CustomError } from '../utils/classes/errors';

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
		for (const _id of exerciseIds) {
			if (!mongoose.isValidObjectId(_id)) {
				throw new CustomError(400, `Invalid exercise id: ${_id}`);
			}
		}

		const deletedExercises = await ExerciseModel.deleteMany({ _id: { $in: exerciseIds } });

		if (deletedExercises.deletedCount === 0) {
			throw new CustomError(400, 'No exercises were deleted');
		}

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
	const { filter } = req.params;

	try {
		const exercises = await ExerciseModel.find({ title: filter }).sort({ createdAt: -1 });
		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};
