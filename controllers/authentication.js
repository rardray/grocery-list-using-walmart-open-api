"use strict";
const jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  User = require("../models/user"),
  config = require("../config/main");

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
