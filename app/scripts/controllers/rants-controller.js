'use strict';

angular.module('devrantAnalyzerApp')
  .controller('RantsController', function ($scope, DevRantService, toastr, ModalService) {
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
    });

      $scope.showRantModal = function (rantId) {
          // Just provide a template url, a controller and call 'showModal'.
          ModalService.showModal({
              templateUrl: "views/rants/rant-modal.html",
              controller: "RantModalController",
              inputs: {
                  rantId: rantId
              }
          }).then(function(modal) {
              modal.element.modal();
              modal.close.then(function() {});
          });
      };
  });
