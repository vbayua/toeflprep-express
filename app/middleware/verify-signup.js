const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateUsernameOrEmail = (request, response, next) => {
  // Username
  User.findOne({
    username: request.body.username
  }).exec((err, user) => {
    if (err) {
      response.status(500).send({ message: err });
      return;
    }
    if (user) {
      response.status(400).send({ message: "Oops! It seems like username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: request.body.email
    }).exec((err, user) => {
      if (err) {
        response.status(500).send({ message: err });
        return;
      }
      if (user) {
        response.status(400).send({ message: "Oh no! that Email is already in use!" });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (request, response, next) => {
  if (request.body.roles) {
    for (let i = 0; i < request.body.roles.length; i++) {
      if (!ROLES.includes(request.body.roles[i])) {
        response.status(400).send({
          message: `Role ${request.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;