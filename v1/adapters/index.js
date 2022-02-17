'use strict';

const crudWrapper = require('./crud');

module.exports = dependencies => ({
  get: crudWrapper({
    repository: dependencies.repository,
  }).get,
  post: crudWrapper({
    repository: dependencies.repository,
  }).post,
  put: crudWrapper({
    repository: dependencies.repository,
  }).put,
  del: crudWrapper({
    repository: dependencies.repository,
  }).del,
});
