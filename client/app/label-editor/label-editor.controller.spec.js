'use strict';

describe('Controller: LabelEditorCtrl', function () {

  // load the controller's module
  beforeEach(module('pivotalUtilsApp'));

  var LabelEditorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabelEditorCtrl = $controller('LabelEditorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
