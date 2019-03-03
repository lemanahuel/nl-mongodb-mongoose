const TaskModel = require('./task.model');

module.exports = class Tasks {

  static create(req, res) {

    TaskModel.create(req.body, (err, doc) => {
      res.status(200).json(doc);
    });

  }

  static list(req, res) {
    TaskModel.find().exec((err, docs) => {
      res.status(200).json(docs);
    });
  }

  static read() {
    TaskModel.findById(req.id).exec((err, doc) => {
      res.status(200).json(doc);
    });

    // TaskModel.findOne({
    //   _id: req.id,
    //   title: 'nahuel'
    // }).exec((err, doc) => {
    //   res.status(200).json(doc);
    // });
  }

}