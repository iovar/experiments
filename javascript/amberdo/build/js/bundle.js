(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'amberdo-storage'
});

require('./router')(App);
require('./models/models')(App);
require('./controllers/controllers')(App);
require('./views/views')(App);

module.exports = App;

},{"./controllers/controllers":2,"./models/models":3,"./router":4,"./views/views":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = function(app) {
  app.Todo = DS.Model.extend({
    text: DS.attr('string'),
    isDone: DS.attr('boolean')
  });

  app.Todo.FIXTURES = [{
    id: 1,
    text: 'red',
    isDone: false
  }, {
    id: 2,
    text: 'yellow',
    isDone: true
  }, {
    id: 3,
    text: 'blue',
    isDone: false
  }];
};

},{}],4:[function(require,module,exports){
module.exports = function(app) {
  console.log('ho');
  app.Router.map(function() {
    this.resource('todos', {path: '/'});
    this.resource('about');
  });

  require('./routes/about')(app);
  require('./routes/todos')(app);
};

},{"./routes/about":5,"./routes/todos":6}],5:[function(require,module,exports){
module.exports = function(app) {
  app.AboutRoute = Ember.Route.extend({
  });
};

},{}],6:[function(require,module,exports){
module.exports = function(app) {
  app.TodosRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('todo');
    }
  });
};

},{}],7:[function(require,module,exports){
module.exports = function(app) {
  app.EditTodoView = Ember.TextField.extend({
    didInsertElement: function() {
      this.$().focus();
    }
  });
  Ember.Handlebars.helper('edit-todo', app.EditTodoView);
};

},{}]},{},[1]);
