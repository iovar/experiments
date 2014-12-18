module.exports = function(app) {
  app.TodosRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('todo');
    }
  });
};
