const AuthenticationController = require("../controllers/authentication"),
  express = require("express"),
  passportService = require("../config/passport"),
  passport = require("passport"),
  ListController = require("../controllers/list"),
  RecipeController = require("../controllers/recipe"),
  UploadController = require("../controllers/upload"),
  CaldataController = require("../controllers/caldata");

//middleware
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
//exports router to index.js as function
module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    listRoutes = express.Router(),
    recipeRoutes = express.Router(),
    uploadRoutes = express.Router(),
    caldataRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  //login Route
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/login", requireLogin, AuthenticationController.login);
  //list Routes
  apiRoutes.use("/list", listRoutes);
  listRoutes.get("/", requireAuth, ListController.getLists);
  listRoutes.post("/post", requireAuth, ListController.postList);
  listRoutes.put("/edit", requireAuth, ListController.editList);
  listRoutes.put("/remove", requireAuth, ListController.clearShoppingList);
  listRoutes.put("/favorite/:id", requireAuth, ListController.addFavorite);
  //recipe routes
  apiRoutes.use("/recipe", recipeRoutes);
  recipeRoutes.post("/post", requireAuth, RecipeController.postRecipe);
  recipeRoutes.get("/one/:id", requireAuth, RecipeController.getRecipe);
  recipeRoutes.get("/all", requireAuth, RecipeController.getRecipes);
  //file upload
  apiRoutes.use("/upload", uploadRoutes);
  uploadRoutes.post("/", requireAuth, UploadController.postImage);
  //calendar data
  apiRoutes.use("/caldata", caldataRoutes);
  caldataRoutes.post("/add", requireAuth, CaldataController.postCaldata);
  caldataRoutes.get("/all", requireAuth, CaldataController.getCaldatas);

  app.use("/api", apiRoutes); //<---- calls login function from authentication and passport
};
