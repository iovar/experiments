(function() {
  angular.module('fallingMath')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/start.html',
          controller: 'startController',
          controllerAs: 'start'
        })
        .when('/game', {
          templateUrl: 'templates/game.html',
          controller: 'gameController',
          controllerAs: 'game'
        })
        .when('/leaderboard', {
          templateUrl: 'templates/leaderboard.html',
          controller: 'leaderboardController',
          controllerAs: 'leaderboard'
        })
        .otherwise( {
          redirectTo: '/'
        });
    }])
  ;
})();
