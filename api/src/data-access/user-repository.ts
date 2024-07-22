import userModel from '../models/user-model';

export const createUserRepository = async (username: string, email: string, password: string) =>
	await userModel.create({ username, email, password });

export const checkIfUserExists = async (email: string) => userModel.findOne({ email });
