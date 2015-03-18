'use strict';

angular.module('pivotalUtilsApp')
  .controller('BulkLabelerCtrl', function ($scope, pivotalService) {
    $scope.filters = [];

    pivotalService.promise.then(function() {
      pivotalService.getProjects().then(function(results) {
        $scope.projects = results.data;
        $scope.projectsString = JSON.stringify($scope.projects, null, 2);
      });


      $scope.projectSelected = function() {
        // load stories for project
        pivotalService.getStories($scope.selectedProject).then(function(results) {
          console.log(results.data);
          $scope.stories = results.data;
        });

        pivotalService.getLabels($scope.selectedProject).then(function(results) {
          $scope.labels = results.data;
          console.log($scope.labels);
        });
      };

      $scope.stateSelected = function() {
        var filter = 'with_state=' + $scope.selectedState;

        addFilter(filter);
      }

      $scope.labelSelected = function(labelId) {
        var filter = 'with_label=' + labelId;

        addFilter(filter);
      };
    });

    function addFilter(value) {
      if (_($scope.filters).find(function(filter) { return filter === value; })) {
        return; // existing filter, nothing needed.
      }

      var index = value.indexOf("=");
      var root = value.substring(0, index);

      $scope.filters = _($scope.filters).reject(function(filter) {
        return filter.search(root) > -1;
      }).value();

      $scope.filters.push(value);
      console.log($scope.filters);

      pivotalService.getStories($scope.selectedProject, $scope.filters).then(function(results) {
        console.log(results.data);
        $scope.stories = results.data;
      });
    }
  });
