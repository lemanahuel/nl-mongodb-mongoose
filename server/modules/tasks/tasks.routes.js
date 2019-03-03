const TasksController = require('./tasks.controller');

module.exports = app => {

  app
    .route('/tasks')
    .post(TasksController.create)
    .get(TasksController.list);

  app
    .route('/tasks/stats')
    .get(TasksController.stats);

  app
    .route('/tasks/:id')
    .get(TasksController.read)
    .delete(TasksController.delete);

  app
    .route('/tasks/:id/title')
    .put(TasksController.updateTitle);

  app
    .route('/tasks/:id/complete')
    .put(TasksController.complete);

};