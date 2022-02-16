'use strict';

const Joi = require('joi');

module.exports = {
  request: {
    get: {},
    headers: {},
    post: Joi.object({ name: Joi.string() }),
  },
};
