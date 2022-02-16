'use strict';

const factory = require('./factory');
const repository = require('../repository');

const adapters = require('../adapters')({
  repository,
});

module.exports = factory(adapters, config);
