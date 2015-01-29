import Ember from 'ember';
import PageTurnMixin from 'front-score/mixins/page-turn';

var SitesIndexController = Ember.ArrayController.extend(
    PageTurnMixin,{});

export default SitesIndexController;
