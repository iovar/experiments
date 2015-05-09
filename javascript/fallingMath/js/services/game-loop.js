(function() {
  angular.module('fallingMath')
    .service('gameLoop', function() {
      this.reset = function() {
        this.paused = false;
      };

      this.start = function() {
        if(!this.canvas) {
          setTimeout(this.start.bind(this), 100);
        }
        else {
          this.game = new fmGame(this.canvas);
          this.game.draw();
        }
      };

      this.setCanvas = function(canvas) {
        this.canvas = canvas;
      };

      this.pauseToggle = function() {
        this.paused = !this.paused;
      };

      this.continue = function() {
        this.paused = false;
      };

      this.reset();
    })
  ;
})();
