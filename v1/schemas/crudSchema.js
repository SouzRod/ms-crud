'use strict';

const Joi = require('joi');

module.exports = {
  request: {
    params: Joi.object({ id: Joi.string() }),
    payload: Joi.object({ name: Joi.string() }),
  },
};
