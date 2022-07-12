const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    }
  ],
}));

modules.exports = User;
