const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String },
    image: { type: String },
    ingredients: [{ type: Object }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
