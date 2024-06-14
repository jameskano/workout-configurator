import WorkoutModel, { WorkoutType } from '../models/workout-model';

export const findByIdInArray = async (exerciseIds: string[]) =>
	await WorkoutModel.find({ exercises: { $in: exerciseIds } });

export const updateWorkout = async (id: string, data: WorkoutType) =>
	await WorkoutModel.findByIdAndUpdate({ _id: id }, data);
