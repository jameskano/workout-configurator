import { RequestHandler } from "express";
import ExerciseModel, { ExerciseType } from "../models/exercise-model";
import mongoose from "mongoose";
import { CustomError } from "../utils/classes/errors";
import { removeIdField } from "../utils/functions/remove-id";

export const getAllExercises: RequestHandler = async (req, res, next) => {
	try {
		const exercises = await ExerciseModel.find({}).sort({ updatedAt: -1 });
		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};

export const getExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.params;

	try {
		if (!mongoose.isValidObjectId(_id)) throw new CustomError(400, "Exercise id invalid");

		const exercise = await ExerciseModel.findById(_id);

		if (!exercise) throw new CustomError(400, "Exercise does not exist");

		res.status(200).json(exercise);
	} catch (error) {
		next(error);
	}
};

export const createExercise: RequestHandler = async (req, res, next) => {
	const { title, sets, reps, RPE, bodyPart, metadata }: ExerciseType = req.body;

	try {
		const newExercise = await ExerciseModel.create({
			title,
			sets,
			reps,
			RPE,
			bodyPart,
			metadata,
		});
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
			throw new CustomError(400, "No exercises were deleted");
		}
		console.log("reach");
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export const updateExercise: RequestHandler = async (req, res, next) => {
	const { _id } = req.body;

	try {
		if (!mongoose.isValidObjectId(_id)) throw new CustomError(400, "Exercise id invalid");

		const updatedExercise = await ExerciseModel.findByIdAndUpdate(
			{ _id },
			{ ...removeIdField(req.body) },
		);

		if (!updatedExercise) throw new CustomError(400, "Exercise does not exist");

		res.status(200).json(updatedExercise);
	} catch (error) {
		next(error);
	}
};
