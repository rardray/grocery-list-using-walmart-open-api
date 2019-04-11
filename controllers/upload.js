const upload = require("../config/fileUpload");
const singleUpload = upload.single("image");

exports.postImage = function(req, res, next) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      res.status(422).send("oh no");
    }
    res.json({ imageUrl: req.file.location });
  });
};
