const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  enable: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('User', schema, 'users');