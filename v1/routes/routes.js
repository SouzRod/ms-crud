'use strict';

const controller = require('../controllers');
const { crudSchema } = require('../schemas');

const get = {
  path: '/v1/crud',
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

module.exports = {
  get,
};
