'use strict';

/**
 * @ngdoc overview
 * @name devrantAnalyzerApp
 * @description
 * # devrantAnalyzerApp
 *
 * Main module of the application.
 */
angular
  .module('devrantAnalyzerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toastr',
    'angularModalService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/rants', {
        templateUrl: 'views/rants.html',
        controller: 'RantsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
