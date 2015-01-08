import Ember from 'ember';

var LibrariesIndexRoute = Ember.Route.extend({
  model: function() {
    var ts = this.store.find('library');
    return ts;
  }
});


export default LibrariesIndexRoute;
