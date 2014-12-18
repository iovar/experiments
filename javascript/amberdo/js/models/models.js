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
