'use strict';

angular.module('devrantAnalyzerApp')
  .constant('APP_URL', 'https://www.devrant.io/api/')
  .constant('APP_PATHS', {
    'RANTS_PATH': 'devrant/rants?app=3&sort=:sort&limit=:limit&skip=:limit',
    'USERS_PATH': 'users/:user_id?app=3&',
    'SEARCH_PATH': 'devrant/search?app=3&term=:term',
    'RANT_PATH': 'devrant/rants/:rant_id?app=3',
    'USER_ID_FROM_NAME': 'get-user-id?username=:user_name&app=3'
  })
  .factory('DevRantService', function ($http, APP_PATHS, APP_URL, $q) {
    var DevRantService = {};

    DevRantService.getIdFromUserName = function(username){
      return $http({
        method: 'GET',
        url: APP_URL + APP_PATHS.USER_ID_FROM_NAME.replace(':user_name', username)
      });
    };

    DevRantService.getUserInfoById = function(id){
      return $http({
        method: 'GET',
        url: APP_URL + APP_PATHS.USERS_PATH.replace(':user_id', id)
      });
    };

    DevRantService.searchByTerm = function(term){
      return $http({
        method: 'GET',
        url: APP_URL + APP_PATHS.SEARCH_PATH.replace(':term', term)
      });
    };

    DevRantService.getRantById = function(id){
      return $http({
        method: 'GET',
        url: APP_URL + APP_PATHS.RANT_PATH.replace(':rant_id', id)
      });
    };

    DevRantService.getRants = function(sort, limit, skip){
      if(_.isUndefined(sort)){
        sort = 'recent';
      }

      if(_.isUndefined(limit)){
        limit = 30;
      }

      if(_.isUndefined(skip)){
        skip = 10;
      }
      
      return $http({
        method: 'GET',
        url: APP_URL + APP_PATHS.RANTS_PATH.replace(':sort', sort).replace(':limit', limit).replace(':skip', skip)
      });
    };

    return DevRantService;
  });
