'use strict';

describe('Service: pivotalService', function () {

  // load the service's module
  beforeEach(module('pivotalUtilsApp'));

  // instantiate service
  var pivotalService;
  beforeEach(inject(function (_pivotalService_) {
    pivotalService = _pivotalService_;
  }));

  it('should do something', function () {
    expect(!!pivotalService).toBe(true);
  });

});
