// Admin responsibilites are managing user
// Call db models
const db = require('../models');
// Bcrypt
const bcrypt = require('bcryptjs');

const UserModel = db.user;
const RoleModel = db.role;

exports.getAllUser = (req, res) => {
  UserModel.find((err, users) => {
    if (err) {
      res.status(500).send({
        message: 'Couldnt fetch users'
      });
      return;
    }
    res.send({
      users: users
    })
  })
}

exports.getUserMhs = (req, res) => {
  UserModel.find().populate({ path: 'roles', select: 'name -_id' }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        err
      })
      return
    }
    res.status(200).send({
      user
    })
  })
}

exports.getUserByUsername = (req, res) => {
  const query = {
    username: req.params.username,
  }
  UserModel.findOne(query, (err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    res.send(user)
  })
}

exports.getUserByRoles = (req, res) => {
  UserModel.find().populate({
    path: 'roles',
  }).exec(
    (err, users) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
      res.send(users);
    }
  )
}

// Admin User CRUD

exports.updateUserFullName = (req, res) => {
  const query = {
    username: req.body.username,
  }
  const update = {
    name: req.body.name
  }
  UserModel.findOneAndUpdate(query, update, {
    new: true,
  }, (err, userdoc) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    res.send({
      message: 'Name of user updated'
    });
  });
}

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
    if (request.body.roles) {
      RoleModel.find(
        { name: { $in: request.body.roles } },
        (err, roles) => {
          if (err) {
            response.status(500).send({
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