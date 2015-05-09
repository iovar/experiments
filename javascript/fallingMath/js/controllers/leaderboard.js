(function() {
  angular.module('fallingMath')
    .controller('leaderboardController', [ 'highscore', function(highscore) {
      this.highscores = highscore.highscores;
    }])
  ;
})();
