const List = require("../models/list");
const Cart = require("../models/cart");
const config = require("../config/main");

exports.getLists = function(req, res, next) {
  List.find({ userId: req.params.id })
    .limit(50)
    .sort("-createdAt")
    .exec(function(err, list) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).send(list);
    });
};

exports.getFavorites = function(req, res, next) {
  List.find({ userId: req.params.id, favorite: true }).exec(function(
    err,
    favorite
  ) {
    if (err) next(err);
    res.status(200).send(favorite);
  });
};

function postCart(req, res, next) {
  Cart.findOne({ historyId: req.id, userId: req.userId }, function(err, list) {
    if (err) next(err);
    if (list) {
      return Cart.findOneAndUpdate(
        { _id: list },
        { $set: { count: req.count + list.count } },
        { new: true },
        function(err, newlist) {
          if (err) next(err);
          res.status(200).send(newlist);
        }
      );
    }
    let cart = new Cart({
      count: req.count,
      historyId: req.id,
      userId: req.userId
    });
    cart.save(function(err, data) {
      if (err) next(err);
      res.status(201).send(data);
    });
  });
}
exports.postList = function(req, res, next) {
  var userId = req.body.userId;
  var searchId = req.body.searchId;
  var image = req.body.image;
  var title = req.body.title;
  var count = req.body.count;
  var favorite = req.body.favorite;

  List.findOne({ searchId: searchId, userId: userId }, function(
    err,
    existingHistory
  ) {
    if (err) {
      return next(err);
    }
    if (existingHistory) {
      return postCart({ id: existingHistory._id, userId, count }, res, next);
    }
    var list = new List({
      searchId: searchId,
      userId: userId,
      image: image,
      title: title,
      count: 1,
      favorite: favorite
    });

    list.save(function(err, lists) {
      if (err) next(err);
      var cart = new Cart({
        userId: userId,
        searchId: searchId,
        count: count,
        historyId: lists._id
      });
      cart.save(function(err, cart) {
        if (err) next(err);
        res.status(201).send({ lists, cart });
      });
    });
  });
};

exports.addFavorite = function(req, res, next) {
  var id = req.body._id;
  var favorite = req.body.favorite;
  var userId = req.body.userId;
  var image = req.body.image;
  var title = req.body.title;
  var searchId = req.body.searchId;
  List.findOne({ searchId: searchId, userId: userId }, function(err, fave) {
    if (err) return next(err);
    if (fave) {
      return List.findOneAndUpdate(
        { searchId: searchId, userId: userId },
        { $set: { favorite: favorite } },
        { new: true },
        function(err, list) {
          if (err) next(err);
          res.status(201).send(list);
        }
      );
    }
    var newFave = new List({
      searchId: searchId,
      userId: userId,
      image: image,
      title: title,
      count: 1,
      favorite: favorite
    });
    newFave.save(function(err, data) {
      if (err) next(err);
      res.status(200).send(data);
    });
  });
};

function randomCalls(req, res, next) {
  List.find({}).exec(function(err, data) {
    if (err) next(err);
    console.log(data);
  });
}
