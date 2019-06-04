const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: false,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      theme: { type: String, default: "default" }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true //<--- remember to add for sort etc
  }
);
//operations performed before post to db
UserSchema.pre("save", function(next) {
  //<---- this is where user data collection is set as user (user = this)
  const user = this,
    SALT_FACTOR = 5;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  //<--- match password to hashed password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
