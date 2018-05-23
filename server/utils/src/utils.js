const csv = require('csvtojson');
const fs = require('fs');
const differenceInDays = require('date-fns/difference_in_days');
const addDays = require('date-fns/add_days');
const CONSTANTS = require('./constants');

const calculateStatus = (queryDate, showDate) => {
  const result = differenceInDays(new Date(queryDate), new Date(showDate));
  let status;
  if (result < -25) {
    status = CONSTANTS.salesNotStarted;
  } else if (result > -25 && result < -5) {
    status = CONSTANTS.openForSales;
  } else if (result >= -5 && result <= 0) {
    status = CONSTANTS.soldOut;
  } else if (result > 0) {
    status = CONSTANTS.inThePast;
  }
  return status;
};

//a concert is running 100 days after openting
const checkIfRunning = (openingDay, showDate) => {
  const diff = differenceInDays(new Date(showDate), new Date(openingDay));
  return diff >= 0 && diff <= 100;
};

const setTicketStatus = (tickets, queryDate, showDate) => {
  const status = calculateStatus(queryDate, showDate);
  let result = [];
  tickets.forEach(ticket => {
    if (checkIfRunning(ticket.opening_day, showDate)) {
      ticket.status = status;
      result.push(ticket);
    }
  });
  return result;
};

const loadCsvFile = path => {
  return csv()
    .fromFile(path)
    .then(jsonObj => {
      return jsonObj;
    })
    .catch(e => {
      console.error(e);
    });
};

module.exports = {
  loadCsvFile: loadCsvFile,
  setTicketStatus: setTicketStatus,
  checkIfRunning: checkIfRunning,
  calculateStatus: calculateStatus,
};
