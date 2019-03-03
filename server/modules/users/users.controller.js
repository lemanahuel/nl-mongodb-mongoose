const _ = require('lodash');
const UserModel = require('./user.model');

module.exports = class Users {

  static create(req, res) {
    UserModel.create(req.body, (err, doc) => {
      res.status(200).json(doc);
    });
  }

  static list(req, res) {
    UserModel.find().lean().exec((err, docs) => {
      res.status(200).json(docs);
    });
  }

  static read(req, res) {
    UserModel.findById(req.params.id).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static delete(req, res) {
    UserModel.findByIdAndUpdate(req.params.id, {
      enable: false
    }).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

}