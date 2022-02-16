'use strict';

const application = require('../../package.json');
const crudController = require('./crudController');

module.exports = (adapters, config) => ({
  get: crudController(
    adapters,
    application.name,
  ).get,
});
