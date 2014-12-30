module.exports = function(app) {
  app.Router.map(function() {
    this.resource('todos', {path: '/'}, function() {
      this.route('active');
      this.route('completed');
    });
  });

  require('./routes/todos')(app);
};
