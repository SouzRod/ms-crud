'use strict';

const crudWrapper = (adapters) => {
  const get = (request, reply) => adapters.get({
    onSuccess: data => reply.response(data).code(200),
    onError: error => reply.response(error).code(error.statusCode),
  });

  const post = (request, reply) => {
    const payload = {
      ...request.payload,
    };

    return adapters.post({
      payload,
      onSuccess: data => reply.response(data).code(200),
      onError: error => reply.response(error).code(error.statusCode),
    });
  };

  const put = (request, reply) => {
    const payload = {
      ...request.params,
      ...request.payload,
    };

    return adapters.put({
      payload,
      onSuccess: data => reply.response(data).code(200),
      onError: error => reply.response(error).code(error.statusCode),
    });
  };

  const del = (request, reply) => {
    const payload = {
      ...request.params,
    };

    return adapters.del({
      payload,
      onSuccess: data => reply.response(data).code(200),
      onError: error => reply.response(error).code(error.statusCode),
    });
  };

  return {
    get,
    post,
    put,
    del,
  };
};

module.exports = crudWrapper;

