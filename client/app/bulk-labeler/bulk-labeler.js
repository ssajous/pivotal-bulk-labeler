'use strict';

angular.module('pivotalUtilsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bulk-labeler', {
        url: '/bulk-labeler',
        templateUrl: 'app/bulk-labeler/bulk-labeler.html',
        controller: 'BulkLabelerCtrl',
        authenticate: true
      });
  });
