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

      onSuccess: data => reply.response(data).code(200),
      onError: error => reply.response(error).code(error.statusCode),

    });
  };
  return {
    get,
  };
};

module.exports = crudWrapper;

