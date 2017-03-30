var app = angular.module('meMories', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/partial-input.html'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'templates/partial-explore-list.html'
    })
    .state('chart', {
      url: '/chart',
      templateUrl: 'templates/partial-explore-chart.html'
    })

  $urlRouterProvider.otherwise('/home');
}]);