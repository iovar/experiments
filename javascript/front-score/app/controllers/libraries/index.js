import Ember from 'ember';
import PageTurnMixin from 'front-score/mixins/page-turn';

var LibrariesIndexController = Ember.ArrayController.extend(
    PageTurnMixin,{});

export default LibrariesIndexController;
