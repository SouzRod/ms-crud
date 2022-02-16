'use strict';

const application = require('../../package.json');
const crudController = require('./crudController');

module.exports = adapters => ({
  get: crudController(
    adapters,
    application.name,
  ).get,
});
