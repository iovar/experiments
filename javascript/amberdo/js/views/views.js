module.exports = function(app) {
  app.EditTodoView = Ember.TextField.extend({
    didInsertElement: function() {
      this.$().focus();
    }
  });
  Ember.Handlebars.helper('edit-todo', app.EditTodoView);
};
