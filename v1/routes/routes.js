'use strict';

const controller = require('../controllers');
const crudSchema = require('../schemas');

const get = {
  path: '/v1/users',
  method: 'GET',
  config: {
    description: 'Description text here',
    notes: 'Describe your notes here',
    tags: ['api'],
    handler: controller.get,
    validate: {
      options: {
        allowUnknown: true,
      },
      query: crudSchema.request.get,
    },
  },
};

const post = {
  path: '/v1/user',
  method: 'POST',
  config: {
    description: 'Description text here',
    notes: 'Describe your notes here',
    tags: ['api'],
    handler: controller.post,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: crudSchema.request.post,
    },
  },
};

module.exports = {
  post,
  get,
};
