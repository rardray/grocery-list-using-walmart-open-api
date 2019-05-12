const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    count: { type: Number, default: 1, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    historyId: { type: Schema.Types.ObjectId, ref: "List", required: true },
    searchId: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
