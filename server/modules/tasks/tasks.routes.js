const TasksController = require('./tasks.controller');

module.exports = app => {

  app
    .route('/tasks')
    .post(TasksController.create);

};