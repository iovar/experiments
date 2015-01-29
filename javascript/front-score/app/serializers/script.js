import DS from "ember-data";

var ScriptSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return {
      scripts: payload.results
    };
  },
  primaryKey: 'script'
});

export default ScriptSerializer;
