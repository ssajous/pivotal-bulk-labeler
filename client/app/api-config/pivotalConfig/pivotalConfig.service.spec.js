'use strict';

describe('Service: pivotalConfig', function () {

  // load the service's module
  beforeEach(module('pivotalBulkLabelerApp'));

  // instantiate service
  var pivotalConfig;
  beforeEach(inject(function (_pivotalConfig_) {
    pivotalConfig = _pivotalConfig_;
  }));

  it('should do something', function () {
    expect(!!pivotalConfig).toBe(true);
  });

});
