const List = require("../models/list");
const config = require("../config/main");

exports.getLists = function(req, res, next) {
  List.find()
    .sort("-created_at")
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
  console.log(req.body.id);
  var list = new List({
    id: id,
    image: image,
    title: title,
    count: count
  });
  list.save(function(err, list) {
    if (err) next(err);
    res.status(201).json(list);
  });
};

exports.editList = function(req, res, next) {
  var id = req.body.id;
  console.log(id);
  var count = req.body.count;
  console.log(req.body);
  List.findOneAndUpdate(
    { id: id },
    { $set: { count: count } },
    { new: true },
    function(err, data) {
      if (err) {
        return next(err);
      }
      res.status(202).send(data), console.log(data);
    }
  );
};
