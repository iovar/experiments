import DS from "ember-data";

var ScriptModel = DS.Model.extend({
  script: DS.attr('string'),
  count: DS.attr('number'),
  resource: DS.attr('string')
});

export default ScriptModel;
