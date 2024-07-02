import { CustomError } from '../utils/classes/errors';
import { checkIfUserExists, createUserRepository } from '../data-access/user-repository';
import userModel from '../models/user-model';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../utils/functions/access-token';

export const loginUserService = async (email: string, password: string) => {
	const userExists = await checkIfUserExists(email);

	if (!userExists) throw new CustomError(400, 'Incorrect email or user does not exist');
	const match = bcrypt.compare(password, userExists.password);
	if (!match) throw new CustomError(400, 'Incorrect password');

	const accessToken = createAccessToken(userExists);

	return accessToken;
};

export const registerUserService = async (username: string, password: string, email: string) => {
	const userExists = userModel.findOne({ email });
	if (!userExists) throw new CustomError(400, 'Email is already in use');

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await createUserRepository(username, email, hash);

	const accessToken = createAccessToken(userExists);

	return { user, accessToken };
};
