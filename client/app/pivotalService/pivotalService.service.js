'use strict';

angular.module('pivotalUtilsApp')
  .factory('pivotalService', function ($resource, $q, $http, pivotalConfig) {
    var deferred = $q.defer();
    var api = {
      promise: deferred.promise
    };

    $http.defaults.headers.common.Authorization = undefined;

    pivotalConfig.getConfig().then(function(config) {

      api.getProjects = function() {
        return $http.get('/api/pivotal/projects');
      };

      api.getStories = function(projectId) {
        return $http.get('/api/pivotal/projects/' + projectId + '/stories');
      }

      deferred.resolve();
    });


    // Public API here
    return api;
  });
