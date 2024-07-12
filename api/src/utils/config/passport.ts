import userModel from '../../models/user-model';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET!,
};

export default passport.use(
	new JwtStrategy(opts, async (payload, done) => {
		try {
			const user = await userModel.findById(payload.sub);
			if (user) return done(null, user);
			else return done(null, false);
		} catch (error) {
			return done(error, false);
		}
	}),
);
