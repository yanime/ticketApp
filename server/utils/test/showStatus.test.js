const expect = require('chai').expect;
const utils = require('../src/utils');
const CONSTANTS = require('../src/constants');

describe('calculateStatus()', function() {
  it('should return undefined for invalid date', function() {
    const queryDate = 'adsfasd';
    const showDay = '2017-01-02';

    const result = utils.calculateStatus(queryDate, showDay);

    expect(result).to.be.equal(undefined);
  });

  it('should return sales not started for show day with open day more than 25 days', function() {
    const queryDate = '2017-01-01';
    const showDay = '2017-03-01';

    const result = utils.calculateStatus(queryDate, showDay);
    expect(result).to.be.equal(CONSTANTS.salesNotStarted);
  });

  it('should return open for sale for show date less than 25 days and greater than 5 days ', function() {
    const queryDate = '2017-03-01';
    const showDay = '2017-03-07';

    const result = utils.calculateStatus(queryDate, showDay);
    expect(result).to.be.equal(CONSTANTS.openForSales);
  });

  it('should return sold out for show date less than 5 days ', function() {
    const queryDate = '2017-03-01';
    const showDay = '2017-03-04';

    const result = utils.calculateStatus(queryDate, showDay);
    expect(result).to.be.equal(CONSTANTS.soldOut);
  });

  it('should return in the past for show with show date in the past ', function() {
    const queryDate = '2017-03-04';
    const showDay = '2017-03-01';

    const result = utils.calculateStatus(queryDate, showDay);
    expect(result).to.be.equal(CONSTANTS.inThePast);
  });
});
