'use strict';

const application = require('../../package.json');
const crudController = require('./crudController');

module.exports = adapters => ({
  get: crudController(
    adapters,
    application.name,
  ).get,

  post: crudController(
    adapters,
    application.name,
  ).post,

  put: crudController(
    adapters,
    application.name,
  ).put,

  del: crudController(
    adapters,
    application.name,
  ).del,
});
