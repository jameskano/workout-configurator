import ExerciseModel from '../models/exercise-model';

export const deleteMany = async (exerciseIds: string[]) => {
	return await ExerciseModel.deleteMany({ _id: { $in: exerciseIds } });
};
