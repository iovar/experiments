import Ember from 'ember';

var SitesIndexRoute = Ember.Route.extend({
  queryParams: {
    limit: {
      refreshModel: true
    },
    skip: {
      refreshModel: true
    }
  },
  model: function(params) {
    var model = this.store.findQuery('site',params);
    return model;
  }
});


export default SitesIndexRoute;
