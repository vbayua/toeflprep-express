// Admin responsibilites are managing user

// Call db models
const db = require('../models');
const bcrypt = require('bcryptjs');
// Bcrypt

exports.getAllUser = (req, res) => {
  // Code
}

exports.getUserById = (req, res) => {
  // Code
}

// Admin User CRUD
const UserModel = db.user
const RoleModel = db.role

exports.createNewUser = (request, response) => {
  const user = new UserModel({
    username: request.body.username,
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      response.status(500).send({
        message: err,
      });
      return;
    }
    // Check if payload has roles
    if (request.body.roles) {
      RoleModel.find(
        { name: { $in: request.body.roles } },
        (err, roles) => {
          if (err) { response.status(500).send({
            message: err,
          }
          ); 
          return;
          }

          user.roles = roles.map(role => role._id);
          user.save((err) => {
            if (err) {
              response.status(500).send({
                message: err,
              });
              return;
            }
            response.send({
              message: 'User was registered succesfully',
            });
          });
        }
      );
    } else {
      RoleModel.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          response.status(500).send({
            message: err,
          });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            response.status(500).send({
              message: err,
            });
            return;
          }
          response.send({
            message: 'User was registered successfuly'
          });
        });
      });
    }
  });
};