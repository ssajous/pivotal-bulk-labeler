'use strict';

angular.module('pivotalUtilsApp')
  .factory('pivotalConfig', function ($resource, $q) {
    var Config = $resource('/api/pivotal-config/:configId', {configId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });

    function getConfig() {
      var deferred = $q.defer();

      Config.query(function(configs) {
        if (configs.length) {
          deferred.resolve(configs[0]);
        } else {
          deferred.resolve(new Config());
        }
      });

      return deferred.promise;
    }

    function saveConfig(config) {
      if (config._id) {
        return config.$update();
      } else {
        return config.$save();
      }
    }

    return {
      getConfig: getConfig,
      save: saveConfig
    };

  });
