const AuthenticationController = require("../controllers/authentication"),
  express = require("express"),
  passportService = require("../config/passport"),
  passport = require("passport"),
  ListController = require("../controllers/list"),
  RecipeController = require("../controllers/recipe"),
  UploadController = require("../controllers/upload"),
  CaldataController = require("../controllers/caldata"),
  CartController = require("../controllers/cart");

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
    caldataRoutes = express.Router(),
    cartRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  //login Route
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/login", requireLogin, AuthenticationController.login);
  //list Routes
  apiRoutes.use("/list", listRoutes);
  listRoutes.get("/:id", requireAuth, ListController.getLists);
  listRoutes.post("/post", requireAuth, ListController.postList);
  listRoutes.post("/favorite", requireAuth, ListController.addFavorite);
  listRoutes.get("/favorites/:id", requireAuth, ListController.getFavorites);
  //recipe routes
  apiRoutes.use("/recipe", recipeRoutes);
  recipeRoutes.post("/post", requireAuth, RecipeController.postRecipe);
  recipeRoutes.get("/one/:id", requireAuth, RecipeController.getRecipe);
  recipeRoutes.get("/all/:id", requireAuth, RecipeController.getRecipes);
  //file upload
  apiRoutes.use("/upload", uploadRoutes);
  uploadRoutes.post("/", requireAuth, UploadController.postImage);
  //calendar data
  apiRoutes.use("/caldata", caldataRoutes);
  caldataRoutes.post("/add", requireAuth, CaldataController.postCaldata);
  caldataRoutes.get("/all/:id", requireAuth, CaldataController.getCaldatas);
  //cart routes
  apiRoutes.use("/cart", cartRoutes);
  cartRoutes.get("/:id", requireAuth, CartController.getCart);
  cartRoutes.delete(
    "/clearone/:id",
    requireAuth,
    CartController.deleteCartItem
  );
  cartRoutes.delete("/clearall/:id", requireAuth, CartController.clearCart);
  cartRoutes.put("/update/:id", requireAuth, CartController.editCart);

  app.use("/api", apiRoutes); //<---- calls login function from authentication and passport
};
