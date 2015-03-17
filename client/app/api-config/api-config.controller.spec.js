'use strict';

describe('Controller: ApiConfigCtrl', function () {

  // load the controller's module
  beforeEach(module('pivotalBulkLabelerApp'));

  var ApiConfigCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApiConfigCtrl = $controller('ApiConfigCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
