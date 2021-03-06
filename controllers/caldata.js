const Caldata = require("../models/caldata");

exports.postCaldata = function(req, res, next) {
  let dow = req.body.dow;
  let mainId = req.body.mainId;
  let userId = req.body.userId;
  let sideOneId = req.body.sideOneId;
  let sideTwoId = req.body.sideTwoId;

  var caldata = new Caldata({
    dow: dow,
    userId: userId,
    mainId: mainId,
    sideOneId: sideOneId,
    sideTwoId: sideTwoId,
    sideOneSingleId: sideOneId,
    sideTwoSingleId: sideTwoId
  });
  caldata.save(function(err, cal) {
    if (err) next(err);
    res.status(201).send(cal);
  });
};

exports.getCaldatas = function(req, res, next) {
  Caldata.find({ userId: req.params.id })
    .sort("-createdAt")
    .populate({
      path: "mainId",
      select: "title image"
    })
    .populate({
      path: "sideOneId",
      select: "title image"
    })
    .populate({
      path: "sideTwoId",
      select: "title image"
    })
    .populate({
      path: "sideOneSingleId",
      select: "title image"
    })
    .populate({
      path: "sideTwoSingleId",
      select: "title image"
    })
    .exec(function(err, cal) {
      if (err) next(err);
      res.status(200).send(cal);
    });
};

exports.getCaldata = function(req, res, next) {
  Caldata.findOne({ _id: req.params.id })
    .populate({
      path: "mainId",
      select: "title image"
    })
    .populate({
      path: "sideOneId",
      select: "title image"
    })
    .populate({ path: "sideTwoId", select: "title image" })
    .populate({ path: "sideOneSingleId", select: "title image searchId count" })
    .populate({ path: "sideTwoSingleId", select: "title image searchId count" })
    .exec(function(err, cal) {
      if (err) next(err);
      res.status(200).send(cal);
    });
};

exports.deleteCaldata = function(req, res, next) {
  id = req.params.id;
  Caldata.findByIdAndDelete(id, function(err, data) {
    if (err) next(err);
    res.status(200).send(data);
  });
};
