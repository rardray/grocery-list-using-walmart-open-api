const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CaldataSchema = new Schema(
  {
    dow: [{ type: Number, required: true }],
    mainId: { type: Schema.Types.ObjectId, ref: "Recipe" },
    sideOneId: { type: Schema.Types.ObjectId, ref: "Recipe" },
    sideOneSingleId: { type: Schema.Types.ObjectId, ref: "List" },
    sideTwoId: { type: Schema.Types.ObjectId, ref: "Recipe" },
    sideTwoSingleId: { type: Schema.Types.ObjectId, ref: "List" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Caldata", CaldataSchema);
