module.exports = function(app) {
  app.TodosRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('todo');
    }
  });

  app.TodosIndexRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('todos');
    }
  });

  app.TodosActiveRoute = Ember.Route.extend({
    model: function() {
      return this.store.filter('todo', function(todo) {
        return !todo.get('isDone');
      });
    },
    renderTemplate: function(controller) {
      this.render('todos/index', {controller: controller});
    }
  });

  app.TodosCompletedRoute = Ember.Route.extend({
    model: function() {
      return this.store.filter('todo', function(todo) {
        return todo.get('isDone');
      });
    },
    renderTemplate: function(controller) {
      this.render('todos/index', {controller: controller});
    }
  });

};
