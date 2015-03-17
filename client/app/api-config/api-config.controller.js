'use strict';

angular.module('pivotalUtilsApp')
  .controller('ApiConfigCtrl', function ($scope, pivotalConfig) {
    $scope.showSuccessMessage = false;

    pivotalConfig.query(function(configs) {
      if (configs.length) {
        $scope.config = configs[0];
      } else {
        $scope.config = new pivotalConfig();
      }
    });

    $scope.saveConfig = function(form) {
      $scope.showSuccessMessage = false;
      if ($scope.config._id) {
        $scope.config.$update().then(displaySuccess);
      } else {
        $scope.config.$save().then(displaySuccess);
      }
    };

    function displaySuccess() {
      $scope.showSuccessMessage = true;
    }
  });
