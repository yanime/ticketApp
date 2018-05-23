'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const server = new Hapi.Server();

server
  .connection({
    port: 5050,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://localhost:3000'],
        headers: ['Accept', 'Content-Type'],
        additionalHeaders: ['X-Requested-With'],
      },
    },
  })
  .state('visited', {
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true,
    isSameSite: false,
  });

server.realm.modifiers.route.prefix = '/api';

const addRoutes = () => {
  require('./controllers/tickets.controller')(server);
};

server
  .register([Inert, Vision])
  .then(() => {
    addRoutes();
    server.start(err => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  })
  .catch(error => {
    console.error('Server plugins registration failed!');
    throw error;
  });
