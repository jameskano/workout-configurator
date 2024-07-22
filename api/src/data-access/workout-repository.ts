import { WorkoutType } from '../utils/types/workout.types';
import WorkoutModel from '../models/workout-model';

export const findByIdInArrayRepository = async (exerciseIds: string[]) =>
	await WorkoutModel.find({ exercises: { $in: exerciseIds } });

export const updateWorkoutRepository = async (id: string, data: WorkoutType) =>
	await WorkoutModel.findByIdAndUpdate({ _id: id }, data, { new: true });

export const getAllWorkoutsRepository = async (userId: string) =>
	await WorkoutModel.find({ userId }).sort({ createdAt: -1 });

export const createWorkoutRepository = async (data: WorkoutType) => await WorkoutModel.create(data);

export const deleteManyRepository = async (workoutIds: string[]) =>
	await WorkoutModel.deleteMany({ _id: { $in: workoutIds } });
