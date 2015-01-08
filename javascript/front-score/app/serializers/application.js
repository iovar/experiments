import DS from "ember-data";

var ApplicationSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    payload.libraries = payload.results;
    delete payload.results;

    return payload;
  },
  primaryKey: 'library'
});

export default ApplicationSerializer;
