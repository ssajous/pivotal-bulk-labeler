'use strict';

angular.module('pivotalUtilsApp')
  .controller('LabelEditorCtrl', function ($scope, pivotalService, $q) {

    pivotalService.promise.then(function () {
      pivotalService.getProjects().then(function (results) {
        $scope.projects = results.data;
      });


      $scope.projectSelected = function () {
        pivotalService.getLabels($scope.selectedProject).then(function (results) {
          $scope.labels = results.data;
        });
      };

      $scope.deleteLabel = function (label) {
        pivotalService.deleteLabel($scope.selectedProject, label.id).then(function() {
          // todo show success message

          _($scope.labels).remove(function(item) {
            return item.id === label.id;
          });
        });
      };
    });
  });
