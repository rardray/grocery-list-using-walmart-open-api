const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
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
      required: true
    },
    inCart: {
      type: Boolean,
      default: false,
      required: true
    },
    cartCount: {
      type: Number,
      required: true
    },
    addedOn: {
      type: Date
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
