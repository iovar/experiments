import DS from "ember-data";

var LibrarySerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return {
      libraries: payload.results
    };
  },
  primaryKey: 'library'
});

export default LibrarySerializer;
