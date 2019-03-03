const TaskModel = require('./task.model');

module.exports = class Tasks {

  static create(req, res) {
    TaskModel.create(req.body, (err, doc) => {
      res.status(200).json(doc);
    });
  }

  static list(req, res) {
    TaskModel.find({
      $or: [{
        enable: {
          $exists: false
        }
      }, {
        enable: true
      }]
    }).exec((err, docs) => {
      res.status(200).json(docs);
    });
  }

  static read(req, res) {
    TaskModel.findById(req.params.id).exec((err, doc) => {
      res.status(200).json(doc);
    });

    // TaskModel.findOne({
    //   _id: req.id,
    //   title: 'nahuel'
    // }).exec((err, doc) => {
    //   res.status(200).json(doc);
    // });
  }

  static delete(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      enable: false
    }).exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static updateTitle(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title
    }, {
        new: true
      }).exec((err, doc) => {
        res.status(200).json(doc);
      });

    // TaskModel.findOneAndUpdate({
    //   _id: req.params.id
    // }, {
    //   title: req.body.title
    // }, {
    //   new: true
    // }).exec((err, doc) => {
    //   res.status(200).json(doc);
    // });
    // TaskModel.updateOne({

    // });
    // TaskModel.updateMany({
    //   title: 'nahuel'
    // }, {
    //     title: 'julian'
    //   }, {
    //     new: true
    //   }).exec((err, docs) => {
    //     console.log(docs);
    //   });
  }

}