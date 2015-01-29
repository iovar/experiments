import Ember from 'ember';

var ScriptsIndexRoute = Ember.Route.extend({
  queryParams: {
    limit: {
      refreshModel: true
    },
    skip: {
      refreshModel: true
    }
  },
  model: function(params) {
    var model = this.store.findQuery('script',params);
    return model;
  }
});


export default ScriptsIndexRoute;
