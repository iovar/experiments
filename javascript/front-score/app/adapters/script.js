import DS from "ember-data";

var ScriptAdapter = DS.RESTAdapter.extend({
  host: "http://api.libscore.com",
  namespace: "v1"
});

export default ScriptAdapter;
