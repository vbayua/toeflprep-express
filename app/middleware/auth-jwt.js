const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = (request, response, next) => {
  let token = request.headers['x-access-token'];

  if (!token) {
    return response.status(403).send({
      message: 'No Token Provided',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: 'Unauthorized!',
      });
    }
    request.userId = decoded.id;
    next();
  });
};

isAdmin = (request, response, next) => {
  User.findById(request.userId).exec((err, user) => {
    if (err) {
      response.status(500).send({
        message: err,
      });
      return;
    }
    Role.find(
      { _id: {$in: user.roles} },
      (err, roles) => {
        if (err) {
          response.status(500).send({
            message: err,
          });
        }
        for (let index = 0; index < roles.length; index++) {
          if (roles[index].name === 'admin') {
            next();
            return;
          }
        }
        response.status(403).send({
          message: 'Require Admin Role!'
        });
        return;
      }
    );
  });
};

isModerator = (request, response, next) => {
  User.findById(request.userId).exec((err, user) => {
    if (err) {
      response.status(500).send({
        message: err,
      });
      return;
    }
    Role.find(
      { _id: { $in: user.roles } },
      (err, roles) => {
        if (err) {
          response.status(500).send({
            message: err
          });
          return;
        }
        for (let index = 0; index < roles.length; index++) {
          if (roles[index].name === 'moderator') {
            next();
            return;
          }
        }
        response.status(403).send({
          message: 'Require moderator role',
        });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;