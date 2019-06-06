"use strict";
const jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  User = require("../models/user"),
  config = require("../config/main"),
  bcrypt = require("bcrypt-nodejs");

function generateToken(user) {
  //<---- generate token
  return jwt.sign(user, config.secret, {});
}

function setUserInfo(request) {
  //<--- set info for cookie.. no sensitive like password
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    theme: request.profile.theme
  };
}
//login route : used in router.js api/auth/login
exports.login = function(req, res, next) {
  let userInfo = setUserInfo(req.user); // <---take submitted data set then generate token and user
  res.status(200).json({
    token: "JWT " + generateToken(userInfo),
    user: userInfo,
    groceryApi: process.env.GROCERY_API
  });
};
//registration route

exports.register = function(req, res, next) {
  // try writing as destructured objects???
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  //return error if no email
  if (!email) {
    return res.status(422).send({ error: "you must enter email address" });
  }
  // error if first and last not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: "please enter full name" });
  }
  if (!password) {
    return res.status(422).send({ error: "you must enter password" });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "email already in use" });
    }
    // if errorcheck passed, create new user
    let user = new User({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName
      }
    });
    user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: "JWT " + generateToken(userInfo), // <---generate token
        user: userInfo,
        groceryApi: process.env.GROCERY_API
      });
    });
  });
};

exports.updatePassword = function(req, res, next) {
  let id = req.body._id;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  User.findById(id, function(err, user) {
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) next(err);
      bcrypt.genSalt(5, function(error, salt) {
        if (error) return next(error);
        bcrypt.hash(newPassword, salt, null, function(err, hash) {
          if (err) next(err);
          User.findByIdAndUpdate(
            id,
            {
              $set: {
                password: hash
              }
            },
            function(err, update) {
              if (err) next(err);
              res.status(201).send("successfully updated");
            }
          );
        });
      });
    });
  });
};

exports.updateUser = function(req, res, next) {
  let id = req.body._id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  User.findByIdAndUpdate(
    id,
    {
      $set: {
        email: email,
        "profile.firstName": firstName,
        "profile.lastName": lastName
      }
    },
    { new: true },
    function(err, data) {
      let newInfo = setUserInfo(data);
      if (err) next(err);
      res.status(201).send(newInfo), console.log(newInfo);
    }
  );
};
