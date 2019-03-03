const _ = require('lodash');
const TaskModel = require('./task.model');

module.exports = class Tasks {

  static create(req, res) {
    TaskModel.create(req.body, (err, doc) => {
      //res.status(200).json(doc);
      req.params.id = doc._id;
      Tasks.read(req, res);
    });
  }

  static list(req, res) {
    const q = req.query;

    TaskModel.find({
      // //Greater Than or E
      // createdAt: {
      //   $gte: new Date(2019, 0, 1),
      //   $gt: new Date(2018, 0, 1),
      //   //Lower than or e
      //   $lte: new Date(2019, 0, 1),
      //   $lt: new Date(2018, 0, 1)
      // },
      // $and: [{
      //   completed: true,
      //   enable: true
      // }, {
      $or: [{
        enable: {
          $exists: false
        }
      }, {
        enable: true
      }],
      // }],
      // order: {
      //   $size: 2
      // },
      // $match: {
      // }
    })
      // .limit(parseInt(q.limit) || 2)
      // .select('-title')
      .sort('-createdAt')
      .populate('user')
      .lean()
      .exec((err, docs) => {
        res.status(200).json(docs);
      });
  }

  static read(req, res) {
    TaskModel.findById(req.params.id)
      .populate('user')
      // .populate([{
      //   path: 'user',
      //   model: 'User',
      //   select: 'name',
      // }, {
      //   path: 'followers',
      //   model: 'User',
      //   select: 'name',
      // }])
      .lean().exec((err, doc) => {
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
    }).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static updateTitle(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title
    }, {
        new: true
      }).lean().exec((err, doc) => {
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

  static complete(req, res) {
    //.lean()
    TaskModel.findById(req.params.id).exec((err, doc) => {
      doc.completed = true;
      doc.save((err, doc) => {
        res.status(200).json(doc);
      });
    });
  }

  static stats(req, res) {
    TaskModel.find({
      $or: [{
        enable: {
          $exists: false
        }
      }, {
        enable: true
      }]
    }).lean().exec((err, docs) => {
      res.status(200).json({
        amunts: docs.length,
        completed: _.filter(docs, doc => doc.completed).length,
        incompleted: _.filter(docs, doc => !doc.completed).length
      });
    });
  }

}