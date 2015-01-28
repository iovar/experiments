import Ember from 'ember';

var LibrariesIndexRoute = Ember.Route.extend({
  queryParams: {
    limit: {
      refreshModel: true
    },
    skip: {
      refreshModel: true
    }
  },
  model: function(params) {
    var model = this.store.findQuery('library',params);
    return model;
  }
});


export default LibrariesIndexRoute;
