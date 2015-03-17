'use strict';

angular.module('pivotalUtilsApp')
  .factory('pivotalService', function ($resource, $q, $http, pivotalConfig) {
    var deferred = $q.defer();
    var api = {
      promise: deferred.promise
    };

    $http.defaults.headers.common.Authorization = undefined;

    pivotalConfig.getConfig().then(function(config) {
      api.Project = $resource('https://www.pivotaltracker.com/services/v5/projects/', {}, {
        headers: {
          'X-TrackerToken': config.apiToken
        }});


      deferred.resolve();
    });


    // Public API here
    return api;
  });
