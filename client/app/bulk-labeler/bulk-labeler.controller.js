'use strict';

angular.module('pivotalUtilsApp')
  .controller('BulkLabelerCtrl', function ($scope, pivotalService) {
    $scope.filters = [];

    pivotalService.promise.then(function() {
      pivotalService.getProjects().then(function(results) {
        console.log(results);
        $scope.projects = results.data;
        $scope.projectsString = JSON.stringify($scope.projects, null, 2);
      });

      $scope.projectSelected = function() {
        // load stories for project
        pivotalService.getStories($scope.selectedProject).then(function(results) {
          console.log(results.data);
          $scope.stories = results.data;
        });
      };

      $scope.stateSelected = function() {
        var stateString = 'with_state=' + $scope.selectedState;

        if (_($scope.filters).find(function(filter) { return filter === stateString; })) {
          return; // existing filter, nothing needed.
        }
        $scope.filters = _($scope.filters).reject(function(filter) {
          return filter.search('with_state=') > -1;
        }).value();

        $scope.filters.push('with_state=' + $scope.selectedState);
        console.log($scope.filters);

        pivotalService.getStories($scope.selectedProject, $scope.filters).then(function(results) {
          console.log(results.data);
          $scope.stories = results.data;
        });
      }
    });


  });
