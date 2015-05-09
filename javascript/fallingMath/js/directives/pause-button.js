(function() {
  angular.module('fallingMath')
    .directive('pauseButton', function() {
      return {
        restrict: 'E',
        replace: true,
        controller: 'pauseButtonController',
        controllerAs: 'pauseButton',
        templateUrl:'templates/partials/pause-button.html'
      };
    })
  ;
})();
