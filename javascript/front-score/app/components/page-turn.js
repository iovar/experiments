import Ember from "ember";

export default Ember.Component.extend({
  prevPage: 'prevPage',
  nextPage: 'nextPage',
  actions: {
    prevPage: function() {
      this.sendAction('prevPage');
    },
    nextPage: function() {
      this.sendAction('nextPage');
    }
  }
});
