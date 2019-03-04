const passport = require("passport"),
  User = require("../models/user"),
  config = require("./main"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require("passport-local");

const localOptions = { usernameField: "email" }; //<--- opt for email field for usernameField

const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { error: "Login could not be verified" });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, { error: "Login could not be verified" });
      }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), //<--- check for authorization headers
  secretOrKey: config.secret //--- find secret key
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
// passing defined strategies for passport to use
passport.use(jwtLogin);
passport.use(localLogin);
