'use strict';

angular.module('devrantAnalyzerApp')
    .controller('RantModalController', function ($scope, rantId, close, DevRantService, toastr) {
        $scope.rantId = rantId;
        $scope.comments = [];
        $scope.rant = {};
        DevRantService.getRantById(rantId)
            .then(function (result) {
                if (result.status === 200) {
                    $scope.rant = result.data.rant;
                    $scope.comments = result.data.comments;
                } else {
                    toastr.error('Error getting rant.');
                }
            }, function (response) {
               toastr.error('Error getting rant.');
            });
    });
