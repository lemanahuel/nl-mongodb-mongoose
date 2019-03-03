const TaskModel = require('./task.model');

module.exports = class Tasks {

  static create(req, res) {

    TaskModel.create(req.body, (err, doc) => {
      res.status(200).json(doc);
    });

  }

}