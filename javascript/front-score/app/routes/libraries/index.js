import Ember from 'ember';

var LibrariesIndexRoute = Ember.Route.extend({
  model: function() {
    var model = this.store.find('library');
    return model;
  }
});


export default LibrariesIndexRoute;
