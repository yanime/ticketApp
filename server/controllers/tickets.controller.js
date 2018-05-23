const Joi = require('joi');
const utils = require('../utils/src/utils');
const format = require('date-fns/format');

const controller = server => {
  server.route({
    method: 'GET',
    path: '/tickets/{date}',
    handler: (request, reply) => {
      const result = [];
      try {
        const csvFilePath = `${__dirname}/shows.csv`;
        const queryDate = format(new Date(), 'YYYY-MM-DD');
        utils.loadCsvFile(csvFilePath).then(data => {
          const result = utils.setTicketStatus(
            data,
            queryDate,
            request.params.date
          );
          return reply({ tickets: result });
        });
      } catch (e) {
        console.log(e);
      }
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          date: Joi.string().optional(),
        },
      },
    },
  });
};
module.exports = controller;
