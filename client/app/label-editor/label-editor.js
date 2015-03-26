'use strict';

angular.module('pivotalUtilsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('label-editor', {
        url: '/label-editor',
        templateUrl: 'app/label-editor/label-editor.html',
        controller: 'LabelEditorCtrl',
        authenticate: true
      });
  });
