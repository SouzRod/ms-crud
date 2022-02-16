'use strict';

const crudWrapper = require('./crud');

module.exports = dependencies => ({
  get: crudWrapper({
    repository: dependencies.repository,
  }).get,
});
