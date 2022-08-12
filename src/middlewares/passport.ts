import { Strategy, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import UserModel from '../models/User';

const tokenExtractor = function (req: any) {
    let bearer = null;
    let cookie = null;
    if (req && req.headers.cookie) cookie = req.headers.cookie.split("=")[1];
    if (req && req.headers.authorization) bearer = req.headers.authorization.split(" ")[1];
    return bearer || cookie;
};

const options: StrategyOptions = {
    jwtFromRequest: tokenExtractor,
    secretOrKey: config.jwtSecret
}

export default new Strategy(options, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id);
        if (!user) return done(null, false);

        return done(null, user);
    } catch (error) {
        console.error(error);
    }
});