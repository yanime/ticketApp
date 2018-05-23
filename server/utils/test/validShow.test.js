var expect = require('chai').expect;
var utils = require('../src/utils');

describe('checkIfRunning()', function() {
  it('should return true if show is running at show date', function() {
    const openingDay = '2017-01-01';
    const showDay = '2017-01-02';

    var result = utils.checkIfRunning(openingDay, showDay);

    expect(result).to.be.equal(true);
  });

  it('should return false if show date is after show date', function() {
    const openingDay = '2017-01-03';
    const showDay = '2017-01-02';

    var result = utils.checkIfRunning(openingDay, showDay);

    expect(result).to.be.equal(false);
  });

  it('should return true if show is in running period of 100 days', function() {
    const showDay = '2017-01-01';
    const openingDay = '2017-03-29';

    var result = utils.checkIfRunning(openingDay, showDay);

    expect(result).to.be.equal(false);
  });
});
