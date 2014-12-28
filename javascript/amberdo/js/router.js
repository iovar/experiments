module.exports = function(app) {
  app.Router.map(function() {
    this.resource('todos', {path: '/'}, function() {

    });
  });

  require('./routes/todos')(app);
};
