'use strict';

const crudWrapper = ({
  repository,
}) => {
  const get = async ({
    onSuccess,
    onError,
  }) => {
    try {
      const result = await repository.usersCollection.findMany({});
      return onSuccess(result);
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };

  const post = async ({
    payload,
    onSuccess,
    onError,
  }) => {
    try {
      const result = await repository.usersCollection.insert(payload);

      return onSuccess(result);
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };

  const put = async ({
    payload,
    onSuccess,
    onError,
  }) => {
    try {
      const { id, name } = payload;

      const result = await repository.usersCollection.updateAndFind({ _id: id }, { name });

      return onSuccess(result);
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };

  const del = async ({
    payload,
    onSuccess,
    onError,
  }) => {
    try {
      const { id } = payload;

      await repository.usersCollection.deleteOne({ _id: id });

      return onSuccess({ message: 'User has been successfully deleted!' });
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };

  return {
    get,
    post,
    put,
    del,
  };

};

module.exports = crudWrapper;
