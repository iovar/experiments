import Ember from 'ember';

var LibrariesIndexController = Ember.ArrayController.extend({
  queryParams: ['skip','limit'],
  skip: null,
  limit: 10,

  hasNextPage: function() {
    var model = this.get("model");
    return model.get('content').length === this.get('limit');
  }.property('skip','limit'),

  hasPrevPage: function() {
    return this.get('skip') > 0;
  }.property('skip','limit'),

  actions: {
    click: function() {
      this.send('nextPage');
    },
    nextPage: function() {
      if(this.get('hasNextPage')) {
        var old_offset = Number(this.get('skip'));
        var new_offset = old_offset + this.get('limit');

        this.set('skip',new_offset);
      }
    },
    prevPage: function() {
      if(this.get('hasPrevPage')) {
        var old_offset = Number(this.get('skip'));
        var new_offset = old_offset - this.get('limit');

        this.set('skip',(new_offset > 0) ? new_offset : 0);
      }
    }
  }
});


export default LibrariesIndexController;
