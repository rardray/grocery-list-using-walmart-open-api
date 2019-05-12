const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    instructions: { type: String },
    image: { type: String },
    ingredients: [
      {
        historyId: { type: Schema.Types.ObjectId, ref: "List" },
        amount: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
