import { RequestHandler } from 'express';
import {
	createWorkoutRepository,
	getAllWorkoutsRepository,
} from '../data-access/workout-repository';
import {
	deleteWorkoutsService,
	getFilteredWorkoutsService,
	updateWorkoutService,
} from '../services/workout-service';

export const getAllWorkouts: RequestHandler = async (req, res, next) => {
	try {
		const workouts = await getAllWorkoutsRepository();
		res.status(200).json(workouts);
	} catch (error) {
		next(error);
	}
};

export const createWorkout: RequestHandler = async (req, res, next) => {
	try {
		const newWorkout = await createWorkoutRepository(req.body);
		res.status(201).json(newWorkout);
	} catch (error) {
		next(error);
	}
};

export const deleteWorkout: RequestHandler = async (req, res, next) => {
	const { workoutIds } = req.body;

	try {
		deleteWorkoutsService(workoutIds);

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export const updateWorkout: RequestHandler = async (req, res, next) => {
	const { _id } = req.body;

	try {
		const updatedWorkout = await updateWorkoutService(_id, req.body);

		res.status(200).json(updatedWorkout);
	} catch (error) {
		next(error);
	}
};

export const getFilteredWorkouts: RequestHandler = async (req, res, next) => {
	const { filter } = req.body;

	try {
		const filteredWorkouts = await getFilteredWorkoutsService(filter);

		res.status(200).json(filteredWorkouts);
	} catch (error) {
		next(error);
	}
};
