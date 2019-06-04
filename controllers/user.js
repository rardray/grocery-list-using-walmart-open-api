const User = require("../models/user");

exports.updateThemne = function(req, res, next) {
  let id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { $set: { "profile.theme": req.body.theme } },
    { new: true },
    function(err, theme) {
      if (err) next(err);
      res.status(201).send(theme);
    }
  );
};
