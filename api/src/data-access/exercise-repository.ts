import { ExerciseType } from '../utils/types/exercise.types';
import ExerciseModel from '../models/exercise-model';

export const deleteMany = async (exerciseIds: string[]) => {
	return await ExerciseModel.deleteMany({ _id: { $in: exerciseIds } });
};

export const getAllExercisesRepository = async (userId: string) =>
	await ExerciseModel.find({ userId }).sort({ createdAt: -1 });

export const getExerciseByIdRepository = async (_id: string) => await ExerciseModel.findById(_id);

export const createExerciseRepository = async (data: ExerciseType) =>
	await ExerciseModel.create(data);

export const updateExerciseRepository = async (_id: string, data: ExerciseType) =>
	await ExerciseModel.findByIdAndUpdate({ _id }, { ...data });

export const getExercisesByIdsRepository = async (exerciseIds: string[]) =>
	await ExerciseModel.find({ _id: { $in: exerciseIds } });
