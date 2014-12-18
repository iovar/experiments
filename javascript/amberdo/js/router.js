module.exports = function(app) {
  console.log('ho');
  app.Router.map(function() {
    this.resource('todos', {path: '/'});
    this.resource('about');
  });

  require('./routes/about')(app);
  require('./routes/todos')(app);
};
