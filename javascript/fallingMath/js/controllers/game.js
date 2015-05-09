(function() {
  angular.module('fallingMath')
    .controller('gameController', ['$scope', '$location', 'highscore', 'gameLoop', function($scope, $location, highscore, gameLoop) {

      this.gameOver = function () {
        this.end = true;
        if(highscore.check(this.score)>=0) {
          this.highscore = true;
        }
      };

      this.reset = function() {
        this.end = false;
        this.highscore = false;
        this.name = null;
        this.score = Math.floor(Math.random() * (100 - 0));
      };

      this.goToStart = function() {
        if(this.name) {
          highscore.add(this.name, this.score);
        }
        gameLoop.reset();
        $location.path('#/start');
      };

      this.reset();
      gameLoop.start();
    }])
  ;
})();
