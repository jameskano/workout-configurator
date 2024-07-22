import { CustomError } from '../../utils/classes/errors';
import validator from 'validator';

export const validateUser = (username: string, email: string, password: string) => {
	const passwordOptions = { minLowercase: 1, minUppercase: 1, minNumbers: 1 };

	switch (false) {
		case validator.isEmail(email):
			throw new CustomError(400, 'Invalid email address');
		case validateStringLength(username, 3, 25):
			throw new CustomError(400, 'Username must be between 3 to 25 characters long');
		case validateStringLength(password, 8, 20):
			throw new CustomError(400, 'The password must be between 8 to 20 characters long');
		case validator.isStrongPassword(password, passwordOptions):
			throw new CustomError(
				400,
				'The password must contain at least 1 uppercase letter, 1 lowercase letter and a number',
			);
	}
};

export const validateExercise = (title: string, sets: number, reps: number, RPE: number) => {
	switch (false) {
		case validateStringLength(title, 3, 20):
			throw new CustomError(400, 'Title must be between 3 to 20 characters long');
		case validateNumberRange(reps, 0, 10000):
			throw new CustomError(400, 'Reps must be a value between 1 to 9999');
		case validateNumberRange(sets, 0, 101):
			throw new CustomError(400, 'Sets must be a value between 1 to 100');
		case validateNumberRange(RPE, 0, 11):
			throw new CustomError(400, 'RPE must be a value between 1 to 10');
	}
};

export const validateWorkout = (title: string, exerciseList: string[]) => {
	switch (false) {
		case validateStringLength(title, 3, 20):
			throw new CustomError(400, 'Title must be between 3 to 20 characters long');
		case validateArrayLength(exerciseList):
			throw new CustomError(400, 'At least one exercise must be added to the workout');
	}
};

const validateNumberRange = (number: number, min: number, max: number) =>
	number > min && number < max;

const validateStringLength = (string: string, min: number, max: number) =>
	validator.isLength(string, { min, max });

const validateArrayLength = (array: any[]) => array.length > 0;
