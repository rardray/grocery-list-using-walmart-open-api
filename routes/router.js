const AuthenticationController = require("../controllers/authentication"),
  express = require("express"),
  passportService = require("../config/passport"),
  passport = require("passport"),
  ListController = require("../controllers/list");

//middleware
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

//exports router to index.js as function
module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    listRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  //login Route
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/login", requireLogin, AuthenticationController.login);
  //list Routes
  apiRoutes.use("/list", listRoutes);
  listRoutes.get("/", requireAuth, ListController.getLists);
  listRoutes.post("/post", requireAuth, ListController.postList);
  listRoutes.put("/edit", requireAuth, ListController.editList);
  app.use("/", apiRoutes); //<---- calls login function from authentication and passport
};
