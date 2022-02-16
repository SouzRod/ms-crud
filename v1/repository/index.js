'use strict';

const factory = require('./factory');
const mongo = require('../../commons/mongo');
const config = require('../../config');

const usersCollection = factory({
  db: mongo,
  collectionName: config.mongo.collections.users,
  configConnection: {
    uri: config.mongo.uri,
    base: config.mongo.base,
  },
});

module.exports = {
  usersCollection,
};
