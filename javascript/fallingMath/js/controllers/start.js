(function() {
  angular.module('fallingMath')
    .controller('startController', [ function() {
      this.buttons = [{
        title: 'Start a new game!',
        link: '#/game'
      }, {
        title: 'High Scores',
        link: '#/leaderboard'
      }];
    }])
  ;
})();
