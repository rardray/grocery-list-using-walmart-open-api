const AuthenticationController = require("../controllers/authentication"),
  express = require("express"),
  passportService = require("../config/passport"),
  passport = require("passport");

//middleware
const requireLogin = passport.authenticate("local", { session: false });

//exports router to index.js as function
module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  //login Route
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/login", requireLogin, AuthenticationController.login);
  app.use("/", apiRoutes); //<---- calls login function from authentication and passport
};
