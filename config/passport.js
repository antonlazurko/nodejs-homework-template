const passport = require('passport');
const { JwtStrategy, Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const Users = require('../model/schemas/user');
const SECRET_KEY = process.env.JWT_SECRET;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      if (!user) {
        return done(new Error('User not found'));
      }
      if (!user.token) {
        return null, false;
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
