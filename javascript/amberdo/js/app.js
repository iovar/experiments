App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'amberdo-storage'
});

require('./router')(App);
require('./models/models')(App);
require('./controllers/controllers')(App);
require('./views/views')(App);

module.exports = App;
