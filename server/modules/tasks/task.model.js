const mongoose = require('mongoose');
const User = require('../users/user.model.js');
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  order: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completed: {
    type: Boolean,
    default: false
  },
  enable: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Task', schema, 'tasks');