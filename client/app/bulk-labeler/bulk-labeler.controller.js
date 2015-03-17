'use strict';

angular.module('pivotalUtilsApp')
  .controller('BulkLabelerCtrl', function ($scope, pivotalService) {
    $scope.message = 'Hello';

    pivotalService.promise.then(function() {
      pivotalService.getProjects().then(function(results) {
        $scope.projectsString = JSON.stringify(results);
      });
    });
  });
