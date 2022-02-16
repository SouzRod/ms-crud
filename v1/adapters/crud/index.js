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
      const { name } = payload;
      console.log(`body: ${{ name }}`);
      const result = await repository.usersCollection.insert({ name });

      console.log(`result: ${result}`);
      return onSuccess(result);
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };

  return {
    get,
    post,
  };

};

module.exports = crudWrapper;
