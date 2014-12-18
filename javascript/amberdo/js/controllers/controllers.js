module.exports = function(app) {
  app.TodosController = Ember.ObjectController.extend({
    inputValue: '',
    remaining: function() {
      return this.get('model')
                 .filterBy('isDone',false)
                 .get('length');
    }.property('@each.isDone'),
    actions: {
      click: function(param) {
        this.store.find('todo', param.id)
            .then(function(item) {
              item.set('isDone',!item.get('isDone'));
              item.save();
            });
      },
      newItem: function() {
        var _input = this.get('inputValue').trim();

        this.set('inputValue', '');
        if(!_input) {
          return;
        }
        var newItem = this.store.createRecord('todo',{
          text: _input,
          isDone: false
        });
        newItem.save();
      }
    }
  });
  app.TodoController = Ember.ObjectController.extend({
    editMode: false,
    actions: {
      editTodo: function() {
        this.set('editMode', true);
      },
      saveTodo: function() {
        this.set('editMode', false);
        var todo = this.get('model');

        if(Ember.isEmpty(todo.get('text'))) {
          this.send('removeTodo');
        }
        else {
          this.get('model').save();
        }
      },
      removeTodo: function() {
        var todo = this.get('model');
        todo.deleteRecord();
        todo.save();
      }
    }
  });
};
