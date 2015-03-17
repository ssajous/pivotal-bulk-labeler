'use strict';

describe('Controller: BulkLabelerCtrl', function () {

  // load the controller's module
  beforeEach(module('pivotalUtilsApp'));

  var BulkLabelerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BulkLabelerCtrl = $controller('BulkLabelerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
