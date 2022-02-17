'use strict';

const Joi = require('joi');

module.exports = {
  request: {
    get: {},
    post: Joi.object({ name: Joi.string() }),
  },
};
