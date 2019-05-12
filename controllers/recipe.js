const Recipe = require("../models/recipe");

exports.postRecipe = function(req, res, next) {
  let title = req.body.title;
  let userId = req.body.userId;
  let instructions = req.body.instructions;
  let ingredients = req.body.ingredients;
  let image = req.body.image;
  var recipe = new Recipe({
    title: title,
    userId: userId,
    instructions: instructions,
    image: image,
    ingredients: ingredients
  });
  recipe.save(function(err, recipe) {
    if (err) next(err);
    res.status(201).send(recipe);
  });
};

exports.getRecipe = function(req, res, next) {
  let id = req.params.id;
  Recipe.findById(id)
    .populate({
      path: "ingredients.historyId",
      select: "title image count favorite searchId"
    })
    .exec(function(err, recipe) {
      if (err) next(err);
      res.status(200).send(recipe);
    });
};

exports.getRecipes = function(req, res, next) {
  Recipe.find({ userId: req.params.id })
    .sort("-createdAt")
    .populate({ path: "ingredients.historyId", select: "title image" })
    .exec(function(err, data) {
      if (err) next(err);
      res.status(200).send(data);
    });
};
