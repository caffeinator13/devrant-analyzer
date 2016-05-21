'use strict';

angular.module('devrantAnalyzerApp')
  .controller('MainNavigatorController', function ($scope, $location) {
    $scope.$location = $location;
  });
