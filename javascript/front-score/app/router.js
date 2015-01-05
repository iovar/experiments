import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('frontscore', {path:'/'});
  this.resource('libraries');
  this.resource('scripts');
  this.resource('sites');
});

export default Router;
