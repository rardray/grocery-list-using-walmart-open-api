const Cart = require("../models/cart");

exports.getCart = function(req, res, next) {
  let id = req.params.id;
  Cart.find({ userId: id })
    .sort("-createdAt")
    .populate({ path: "historyId", select: "title image favorite searchId" })
    .exec(function(err, cart) {
      if (err) next(err);
      res.status(200).send(cart);
    });
};

exports.deleteCartItem = function(req, res, next) {
  var id = req.params.id;
  Cart.findOneAndDelete({ _id: id }, function(err, data) {
    if (err) return next(err);
    res.status(200).send(data);
  });
};

exports.clearCart = function(req, res, next) {
  Cart.deleteMany({ userId: req.params.id }).exec(function(err, data) {
    if (err) return next(err);
    res.status(200).send(data);
  });
};

exports.editCart = function(req, res, next) {
  var id = req.params.id;
  var count = req.body.count;
  Cart.findOneAndUpdate({ _id: id }, { $set: { count: count } }, { new: true })
    .populate({
      path: "historyId",
      select: "image title searchId favorite"
    })
    .exec(function(err, cart) {
      if (err) return next(err);
      res.status(200).send(cart);
    });
};
