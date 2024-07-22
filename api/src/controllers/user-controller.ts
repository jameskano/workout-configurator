import { loginUserService, registerUserService } from '../services/user-service';
import { RequestHandler } from 'express';
import passport from 'passport';

export const loginUser: RequestHandler = async (req, res, next) => {
	const { password, email } = req.body;

	try {
		const { accessToken, user } = await loginUserService(email, password);

		res.status(200).json({
			message: 'User logged in successfully',
			accessToken,
			userId: user._id,
		});
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
			accessToken,
			userId: user._id,
		});
	} catch (error) {
		next(error);
	}
};

export const checkTokenValidity: RequestHandler = (req, res) => {
	passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
		if (err || !user) {
			return res.json({ valid: false });
		}
		return res.json({ valid: true });
	})(req, res);
};
