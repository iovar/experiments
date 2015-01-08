import Ember from 'ember';

var LibrariesIndexController = Ember.ArrayController.extend({
  actions: {
    click: function() {
      console.log(this);
    }
  }
});


export default LibrariesIndexController;
