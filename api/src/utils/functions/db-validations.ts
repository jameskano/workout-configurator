import mongoose from 'mongoose';
import { CustomError } from '../classes/errors';
import { CommonEntityType } from '../types/common-types';

export const exerciseIdValidation = async (_id: string) => {
	if (!mongoose.isValidObjectId(_id)) {
		throw new CustomError(400, `Invalid exercise id: ${_id}`);
	}
};

export const workoutIdValidation = async (_id: string) => {
	if (!mongoose.isValidObjectId(_id)) {
		throw new CustomError(400, `Invalid workout id: ${_id}`);
	}
};

export const checkIfElementExists = async (element: CommonEntityType, elementType?: string) => {
	if (!element) throw new CustomError(400, `${elementType || 'Element'} does not exist`);
};
