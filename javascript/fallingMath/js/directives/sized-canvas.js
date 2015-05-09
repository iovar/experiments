(function() {
  angular.module('fallingMath')
    .directive('sizedCanvas',['gameLoop', function(gameLoop) {
      var link = function(scope, element, attrs) {
        var parent = element.parent(),
            width = parent[0].clientWidth,
            height = parent[0].clientHeight;

        if(height/width <= 1.5) {
          element[0].height = height;
          element[0].width = height/1.5;
        }
        else {
          element[0].width = width;
          element[0].height = width*1.5;
        }
        gameLoop.setCanvas(element[0]);
      };

      return {
        restrict: 'E',
        replace: true,
        link: link,
        template:'<canvas class="game-canvas"></canvas>'
      };
    }])
  ;
})();
