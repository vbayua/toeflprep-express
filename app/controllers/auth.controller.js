const config = require('../config/auth');
const db = require('../models');

const User = db.user;
const Role = db.role;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (request, response) => {
  const user = new User({
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
      Role.find(
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
      Role.findOne({ name: 'user' }, (err, role) => {
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
            message: 'User was registered successfuly',
            user: user,
          });
        });
      });
    }
  });
};

exports.signin = (request, response) => {
  User.findOne({
    username: request.body.username,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        response.status(500).send({
          message: err,
        });
        return;
      }
      if (!user) {
        return response.status(404).send({
          message: 'User not found',
        });
      }
      let passwordIsValid = bcrypt.compareSync(
        request.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return response.status(401).send({
          accessToken: null,
          message: 'Invalid Password',
        });
      }

      let token = jwt.sign(
        { id: user.id },
        config.secret,
        { expiresIn: '10h' } //use env maybe
      );

      let authorities = [];
      for (let index = 0; index < user.roles.length; index++) {
        authorities.push(`${user.roles[index].name.toLowerCase()}`);
      }
      response.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
}