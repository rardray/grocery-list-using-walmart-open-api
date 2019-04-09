const List = require("../models/list");
const config = require("../config/main");

exports.getLists = function(req, res, next) {
  List.find()
    .sort("-createdAt")
    .exec(function(err, list) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.json(list);
    });
};

exports.postList = function(req, res, next) {
  var id = req.body.id;
  var image = req.body.image;
  var title = req.body.title;
  var count = req.body.count;
  var cartCount = req.body.cartCount;
  var inCart = req.body.inCart;
  var addedOn = req.body.addedOn;
  var favorite = req.body.favorite;
  console.log(req.body.id);
  var list = new List({
    id: id,
    image: image,
    title: title,
    count: count,
    cartCount: cartCount,
    inCart: inCart,
    addedOn: addedOn,
    favorite: favorite
  });
  list.save(function(err, list) {
    if (err) next(err);
    res.status(201).send(list);
  });
};

exports.clearShoppingList = function(req, res, next) {
  List.updateMany(
    {},
    { $set: { cartCount: 0, inCart: false } },
    { new: true },
    function(err, list) {
      if (err) next(err);
      res.status(202).send(list);
    }
  );
};

exports.addFavorite = function(req, res, next) {
  var id = req.params.id;
  var favorite = req.body.favorite;
  console.log(favorite);
  List.findOneAndUpdate(
    { id: id },
    { $set: { favorite: favorite } },
    { new: true },
    function(err, list) {
      if (err) next(err);
      res.status(202).send(list);
    }
  );
};
exports.editList = function(req, res, next) {
  var id = req.body.id;
  var count = req.body.count;
  var inCart = req.body.inCart;
  var cartCount = req.body.cartCount;
  var addedOn = req.body.addedOn;
  var favorite = req.body.favorite;
  List.findOneAndUpdate(
    { id: id },
    {
      $set: {
        count: count,
        inCart: inCart,
        cartCount: cartCount,
        addedOn: addedOn,
        favorite: favorite
      }
    },
    { new: true },
    function(err, list) {
      if (err) {
        return next(err);
      }
      res.status(202).send(list);
    }
  );
};
exports.deleteList = function(req, res, next) {
  var id = req.params.id;
  List.findOneAndDelete({ id: id }, function(err, data) {
    if (err) return next(err);
    res.status(202).send(data);
  });
};

exports.clearList = function(req, res, next) {
  List.deleteMany({}).exec(function(err, data) {
    if (err) return next(err);
    res.status(202).send(data);
  });
};
