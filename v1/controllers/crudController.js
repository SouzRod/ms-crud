'use strict';

const crudWrapper = (adapters, applicatioName) => {

  const get = (request, reply) => {

    const payload = {
      ...request.query,
      applicationName: applicatioName,
    };


    return adapters.get({
      payload,
      headers: {
        ...request.headers,
      },

      onSuccess: (data) => {
        return reply.response(data).code(200);
      },
      onError: (error) => {
        return reply.response(error).code(error.statusCode);
      },

    });
  };
  return {
    get,
  };
};

module.exports = crudWrapper;

