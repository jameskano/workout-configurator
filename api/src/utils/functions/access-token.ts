import jwt from 'jsonwebtoken';

export const createAccessToken = (user: any) =>
	jwt.sign(
		{
			sub: user._id.toString(),
			email: user.email,
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: '10w',
		},
	);
