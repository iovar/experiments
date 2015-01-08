import DS from "ember-data";

var LibraryModel = DS.Model.extend({
  library: DS.attr('string'),
  count: DS.attr('number'),
  github: DS.attr('string'),
  resource: DS.attr('string')
});

export default LibraryModel;



