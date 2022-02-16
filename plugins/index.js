'use strict';

const inert = require('./inert');
const vision = require('./vision');
const hapiSwaggered = require('./hapi-swaggered');
const hapiSwaggeredUI = require('./hapi-swaggered-ui');
const hapiResponseTime = require('./hapi-response-time');

module.exports = [
  inert,
  vision,
  hapiSwaggered,
  hapiSwaggeredUI,
  hapiResponseTime,
];
