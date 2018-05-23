const argv = require('minimist')(process.argv.slice(2));
const utils = require('./src/utils');

function validateFilename(argv) {
  return argv && argv.filename && typeof argv.filename === 'string'
    ? true
    : false;
}

function validateQueryDate(argv) {
  return argv && argv.queryDate && typeof argv.queryDate === 'string'
    ? true
    : false;
}

function validateShowDate(argv) {
  return argv && argv.showDate && typeof argv.showDate === 'string'
    ? true
    : false;
}

const main = argv => {
  if (
    validateFilename(argv) &&
    validateShowDate(argv) &&
    validateQueryDate(argv)
  ) {
    const csvFilePath = `${__dirname}/${argv.filename}`;
    const queryDate = argv.queryDate;
    const showDate = argv.showDate;

    utils.loadCsvFile(csvFilePath).then(data => {
      const result = utils.setTicketStatus(data, queryDate, showDate);
      console.log(result);
    });
  } else {
    console.error(
      'Parameters are missing or are in the wrong format, please use npm start -- --filename=shows.csv --queryDate=2017-01-01 --showDate=2017-02-30'
    );
  }
};

main(argv);
