'use strict';

angular.module('pivotalBulkLabelerApp')
  .service('pivotalConfig', function ($resource) {
    var Config = $resource('/api/pivotal-config/:configId', {configId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });

    return Config;
  });
