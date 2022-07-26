const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  email: {
    type: String,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    }
  ],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Results'
    }
  ]
}));

module.exports = User;
