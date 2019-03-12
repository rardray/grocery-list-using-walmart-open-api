const List = require("../models/list");
const History = require("../models/history");
const config = require("../config/main");

exports.getHistory = function(req, res, next) {
  History.find()
    .sort("-createdAt")
    .limit(50)
    .exec(function(err, history) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.json(history);
    });
};

exports.postHistory = function(req, res, next) {
  var id = req.body.id;
  var image = req.body.image;
  var title = req.body.title;
  var count = req.body.count;
  console.log(req.body.id);
  var history = new History({
    id: id,
    image: image,
    title: title,
    count: count
  });
  history.save(function(err, history) {
    if (err) next(err);
    res.status(201).json(history);
  });
};
