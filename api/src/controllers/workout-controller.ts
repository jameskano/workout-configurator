import { RequestHandler } from 'express';
import WorkoutModel from '../models/workout-model';
import mongoose from 'mongoose';
import { CustomError } from '../utils/classes/errors';
const diacriticLess = require('diacriticless');

export const getAllWorkouts: RequestHandler = async (req, res, next) => {
	try {
		const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
		res.status(200).json(workouts);
	} catch (error) {
		next(error);
	}
};

export const createWorkout: RequestHandler = async (req, res, next) => {
	try {
		const newWorkout = await WorkoutModel.create(req.body);
		res.status(201).json(newWorkout);
	} catch (error) {
		next(error);
	}
};

export const deleteWorkout: RequestHandler = async (req, res, next) => {
	const { workoutIds } = req.body;

	try {
		for (const _id of workoutIds) {
			if (!mongoose.isValidObjectId(_id)) {
				throw new CustomError(400, `Invalid workout id: ${_id}`);
			}
		}

		const deletedExercises = await WorkoutModel.deleteMany({ _id: { $in: workoutIds } });

		if (deletedExercises.deletedCount === 0) {
			throw new CustomError(400, 'No workouts were deleted');
		}

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export const updateWorkout: RequestHandler = async (req, res, next) => {
	const { _id } = req.body;

	try {
		if (!mongoose.isValidObjectId(_id))
			throw new CustomError(400, `Invalid workout id: ${_id}`);

		const updatedWorkout = await WorkoutModel.findByIdAndUpdate({ _id }, { ...req.body });

		if (!updatedWorkout) throw new CustomError(400, 'Workout does not exist');

		res.status(200).json(updatedWorkout);
	} catch (error) {
		next(error);
	}
};

export const getFilteredWorkouts: RequestHandler = async (req, res, next) => {
	const { filter } = req.body;

	try {
		const formattedFilter = diacriticLess(filter.toLowerCase());
		const workouts = await WorkoutModel.find({}).sort({
			createdAt: -1,
		});
		const filteredWorkouts = workouts.filter((workout) => {
			const titleWithoutDiacritics = diacriticLess(workout.title.toLowerCase());
			return titleWithoutDiacritics.includes(formattedFilter);
		});

		res.status(200).json(filteredWorkouts);
	} catch (error) {
		next(error);
	}
};
