'use strict';

angular.module('devrantAnalyzerApp')
  .controller('MainController', function (DevRantService, $scope, toastr) {
    $scope.working = false;
    $scope.handleSendClicked = function(){
      $scope.working = true;
      DevRantService.getIdFromUserName($scope.username).then(function(result){
        if(result.status === 200){
          DevRantService.getUserInfoById(result.data.user_id).then(function(result){
            if(result.status === 200){
              result.data.profile.content.content.rants = _.sortBy(result.data.profile.content.content.rants, function(item){
                return -item.num_upvotes;
              });

              result.data.profile.content.content.comments = _.sortBy(result.data.profile.content.content.comments, function(item){
                return -item.num_upvotes;
              });
              $scope.working = false;
              $scope.userData = result.data.profile;
            }else{
              $scope.working = false;
              toastr.error('Some error in MainController');
            }
          });
        }else{
          $scope.working = false;
          toastr.error('Some error in MainController');
        }
      }, function(reason){
        $scope.working = false;
        toastr.error('Some error in MainController');
      });
    };
  });
