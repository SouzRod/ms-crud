'use strict';

const crudWrapper = (adapters, applicatioName) => {
  const get = (request, reply) => adapters.get({
    onSuccess: data => reply.response(data).code(200),
    onError: error => reply.response(error).code(error.statusCode),
  });

  const post = (request, reply) => {
    const payload = {
      ...request.payload,
      applicationName: applicatioName,
    };

    return adapters.post({
      payload,
      onSuccess: data => reply.response(data).code(200),
      onError: error => reply.response(error).code(error.statusCode),
    });
  };

  return {
    get,
    post,
  };
};

module.exports = crudWrapper;

