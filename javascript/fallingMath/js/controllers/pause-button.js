(function() {
  angular.module('fallingMath')
    .controller('pauseButtonController',['$scope', '$element', '$attrs', '$location', 'gameLoop',  function($scope, $element, $attrs, $location, gameLoop) {
      this.resume = function(event) {
        this.element.removeClass('open');
        gameLoop.continue();
        event.stopPropagation();
      };
      this.toggle = function() {
        this.element.toggleClass('open');
        gameLoop.pauseToggle();
      };
      this.goToStart = function() {
        gameLoop.reset();
        $location.path('#/start');
      };
      this.element = $element;
    }])
  ;
})();
