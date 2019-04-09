const upload = require("../config/fileUpload");
const singleUpload = upload.single("image");

exports.postImage = function(req, res, next) {
  singleUpload(req, res, function(err, some) {
    if (err) next(err);
    res.json({ imageUrl: req.file.location });
  });
};
