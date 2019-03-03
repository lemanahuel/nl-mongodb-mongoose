const mongoose = require('mongoose');
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
  completed: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Task', schema, 'tasks');