const UsersController = require('./users.controller');

module.exports = app => {

  app
    .route('/users')
    .post(UsersController.create)
    .get(UsersController.list);

  app
    .route('/users/:id')
    .get(UsersController.read)
    .delete(UsersController.delete);

};