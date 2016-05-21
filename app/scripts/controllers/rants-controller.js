'use strict';

angular.module('devrantAnalyzerApp')
  .controller('RantsController', function ($scope, DevRantService, toastr) {
    $scope.loading = true;
    DevRantService.getRants().then(function(result){
      if(result.status === 200){
        $scope.loading = false;
        $scope.rants = result.data.rants;
      }else{
        toastr.error('Some error in RantsController');
      }
    })
  });
