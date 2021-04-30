const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

// jwt_payload is an object literal containing the decoded JWT payload.
// done is a passport error first callback accepting arguments done(error, user, info)
module.exports = new Strategy(options, async (payload, done) => {
    try {
        const existUser = await User.findById(payload.id);
        existUser ? done(null, existUser) : done(null, false);
    } catch (err) {
        done(err, false);
    }
});
