'use strict';

angular.module('devrantAnalyzerApp')
  .controller('RantsController', function ($scope, DevRantService, toastr) {
    $scope.loading = true;
    $scope.images = [];
    DevRantService.getRants().then(function(result){
      if(result.status === 200){
        $scope.loading = false;
        $scope.rants = result.data.rants;
        $scope.images = $scope.rants.filter(function (x) {
            return x.attached_image !== '';
        }).map(function (x) {
            return x.attached_image.url;
        });
      }else{
        toastr.error('Some error in RantsController');
      }
    })
  });
