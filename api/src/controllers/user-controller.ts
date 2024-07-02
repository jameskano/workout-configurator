import { loginUserService, registerUserService } from '../services/user-service';
import { RequestHandler } from 'express';

export const loginUser: RequestHandler = async (req, res, next) => {
	const { password, email } = req.body;

	try {
		const accessToken = await loginUserService(email, password);

		res.status(200).json({ message: 'User logged in successfully', accessToken });
	} catch (error) {
		next(error);
	}
};

export const registerUser: RequestHandler = async (req, res, next) => {
	const { username, password, email } = req.body;

	try {
		const { user, accessToken } = await registerUserService(username, password, email);

		res.status(201).json({
			message: 'User registered successfully',
			user: { email: user.email, username: user.username, userId: user._id },
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};
