const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    searchId: {
      type: Number,
      required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true,
      default: 1
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("List", ListSchema);
