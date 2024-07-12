import passportConfig from '../utils/config/passport';

export const requireAuth = passportConfig.authenticate('jwt', { session: false });
