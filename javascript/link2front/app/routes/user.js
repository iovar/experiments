module.exports = function(app) {
  var userController = require('../controllers/user.js');

  app.route('/users')
     .get(userController.list)
     .post(userController.create);

  app.route('/users/:id')
     .get(userController.read)
     .put(userController.update)
     .delete(userController.remove);

};

