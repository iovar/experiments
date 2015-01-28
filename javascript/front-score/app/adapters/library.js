import Ember from 'ember';
import DS from "ember-data";

var LibraryAdapter = DS.RESTAdapter.extend({
  host: "http://api.libscore.com",
  namespace: "v1",
  buildURL: function(type, id, record) {
    var url = this._super(type,id,record);

    return url;
  }
});

export default LibraryAdapter;
