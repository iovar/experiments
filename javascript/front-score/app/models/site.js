import DS from "ember-data";

var SiteModel = DS.Model.extend({
  url: DS.attr('string'),
  rank: DS.attr('number'),
  resource: DS.attr('string')
});

export default SiteModel;
