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
      payload: crudSchema.request.payload,
    },
  },
};

const put = {
  path: '/v1/user/{id}',
  method: 'PUT',
  config: {
    description: 'Description text here',
    notes: 'Describe your notes here',
    tags: ['api'],
    handler: controller.put,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: crudSchema.request.payload,
      params: crudSchema.request.params,
    },
  },
};

const del = {
  path: '/v1/user/{id}',
  method: 'DELETE',
  config: {
    description: 'Description text here',
    notes: 'Describe your notes here',
    tags: ['api'],
    handler: controller.del,
    validate: {
      options: {
        allowUnknown: true,
      },
      params: crudSchema.request.params,
    },
  },
};

module.exports = [
  post,
  put,
  get,
  del,
];
