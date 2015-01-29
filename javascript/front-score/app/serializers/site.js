import DS from "ember-data";

var SiteSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return {
      sites: payload.results
    };
  },
  primaryKey: 'url'
});

export default SiteSerializer;
