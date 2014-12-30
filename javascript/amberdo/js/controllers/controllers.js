module.exports = function(app) {
  app.TodosController = Ember.ArrayController.extend({
    inputValue: '',
    remaining: function() {
      return this.filterBy('isDone',false)
                 .get('length');
    }.property('@each.isDone'),
    hasCompleted: function() {
      return this.get('completed') > 0;
    }.property('completed'),
    completed: function() {
      return this.filterBy('isDone',true).get('length');
    }.property('@each.isDone'),
    allAreDone: function(key, value) {
      if(value === undefined) {
        return !!this.get('length') && this.isEvery('isDone');
      }
      else {
        this.setEach('isDone',value);
        this.invoke('save');
        return value;
      }
    }.property('@each.isDone'),
    actions: {
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
      },
      clearComleted: function() {
        var completed = this.filterBy('isDone',true);

        completed.invoke('deleteRecord');
        completed.invoke('save');
      }
    }
  });
  app.TodoController = Ember.ObjectController.extend({
    editMode: false,
    actions: {
      click: function(param) {
        this.store.find('todo', param.id)
            .then(function(item) {
              item.set('isDone',!item.get('isDone'));
              item.save();
            });
      },
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
