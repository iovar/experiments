import DS from "ember-data";

var SiteAdapter = DS.RESTAdapter.extend({
  host: "http://api.libscore.com",
  namespace: "v1"
});

export default SiteAdapter;
