'use strict';

const hapiSwaggered = require('hapi-swaggered');
const { version } = require('../../package.json');
const { stripPrefix: { path } } = require('../../config');

const options = {
  tags: {
    api: 'API',
  },
  info: {
    title: 'API',
    description: 'Swagger',
    version,
  },
};

module.exports = {
  plugin: hapiSwaggered,
  options: { ...options, stripPrefix: path },
};

