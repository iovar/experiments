import Ember from 'ember';
import PageTurnMixin from 'front-score/mixins/page-turn';

var ScriptsIndexController = Ember.ArrayController.extend(
    PageTurnMixin,{});

export default ScriptsIndexController;
