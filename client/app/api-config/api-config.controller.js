'use strict';

angular.module('pivotalUtilsApp')
  .controller('ApiConfigCtrl', function ($scope, pivotalConfig) {
    $scope.showSuccessMessage = false;

    pivotalConfig.getConfig().then(function(config) {
      $scope.config = config;
    });

    $scope.saveConfig = function(form) {
      $scope.showSuccessMessage = false;
      pivotalConfig.save($scope.config).then(displaySuccess);
    };

    function displaySuccess() {
      $scope.showSuccessMessage = true;
    }
  });
