import DS from "ember-data";

var LibrarySerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    payload.libraries = payload.results;
    delete payload.results;

    return payload;
  },
  primaryKey: 'library'
});

export default LibrarySerializer;
